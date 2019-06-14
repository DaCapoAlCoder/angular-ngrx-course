import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoursesState} from './course.reducers';

import * as fromCourse from './course.reducers';
import { PageQuery } from './course.actions';
import { LessonsState, selectAll } from './lessons.reducers';
import * as fromLessons from './lessons.reducers';

export const selectCoursesState = createFeatureSelector<CoursesState>("courses");
export const selectLessonsState = createFeatureSelector<LessonsState>('lessons');

export const selectCourseById = (courseId:number) => createSelector(
  selectCoursesState,
  coursesState => coursesState.entities[courseId]
);

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourse.selectAll

);

export const allCoursesLoaded = createSelector(
  selectCoursesState,
  coursesState => coursesState.allCoursesLoaded
);

export const selectAllLessons = createSelector(
  selectLessonsState,
  fromLessons.selectAll
);

export const selectLessonsPage = (courseId: number, page: PageQuery) => createSelector(
  selectAllLessons,
  allLessons => {
    const start = page.pageIndex * page.pageSize;
    const end = start + page.pageSize;
    return allLessons.filter( lesson => lesson.courseId === courseId).slice(start, end);
  }
 );

export const selectLessonsLoading = createSelector(
  selectLessonsState,
  lessonState => lessonState.loading
);
