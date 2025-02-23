"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import graphqlClient from "./apollo_client";

export default function ApolloWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>;
}
