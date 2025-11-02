import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

import { Advocate } from "@/app/page";

export async function GET(request: NextRequest) {
  // Uncomment these lines if using a database.
  //const data = await db.select().from(advocates);
  const {searchParams} = new URL(request.url);

  var start = Number.parseInt(searchParams.get("start") ?? "0");
  var take = Number.parseInt(searchParams.get("take") ?? "-1");
  var query = {
    offset: start,
    limit: take <= 0 ? null : take,
  };
  var searchValue = searchParams.get("searchValue") ?? "";

  console.log({searchValue, start, take});

  var data = advocateData as Advocate[];

  if (searchValue != "") {
    //Real code would look similar except it would be a WHERE query with OR statements
    //doing the same thing: checking to see if one of them includes the search term.
    //This still feels costly
    console.log(searchValue);
    data = data.filter((adv: Advocate) => {
      return AdvocateHasSearchValue(adv, searchValue);
    });
  }

  //var totalNum = db.count().from(advocates);
  var totalCount = data.length;

  if (start != 0) {
    data = data.slice(start);
  }
  if (take > 0) {
    data = data.slice(0, take);
  }

  return Response.json({ advocates: data, totalCount: totalCount });
}

function AdvocateHasSearchValue(
  advocate: Advocate,
  searchTerm: string
): boolean {
  return (
    advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ArrayHasOneOrMoreMatches(advocate.specialties, searchTerm) ||
    advocate.yearsOfExperience.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );
}

function ArrayHasOneOrMoreMatches(
  array: string[],
  searchTerm: string
): boolean {
  for (var i = 0; i < array.length; i++) {
    if (array[i] != "" && array[i].toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
  }
  return false;
}
