/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CourseListQuery
// ====================================================

export interface CourseListQuery_viewer {
  __typename: "Viewer";
  username: string | null;
  firstName: string | null;
  lastName: string | null;
}

export interface CourseListQuery {
  viewer: CourseListQuery_viewer | null;
}
