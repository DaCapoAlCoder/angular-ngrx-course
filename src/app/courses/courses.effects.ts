import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { CourseRequested, CourseActionTypes, CourseLoaded, AllCoursesRequested, AllCoursesLoaded } from './course.actions';
import { mergeMap, map, tap, filter, withLatestFrom } from 'rxjs/operators';
import { CoursesService } from './services/courses.service';
import { AppState } from '../reducers';
import { Store, select } from '@ngrx/store';
import { allCoursesLoaded } from './course.selectors';

@Injectable()
export class CourseEffects {

    @Effect()
    loadCourses$ = this.actions$
    .pipe(
        ofType<CourseRequested>(CourseActionTypes.CourseRequested),
        mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
        map( course => new CourseLoaded({course}))
    );

    @Effect()
    loadAllCourses$ = this.actions$
    .pipe(
        ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
        withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
        filter( ([action, allCoursesLoaded]) => !allCoursesLoaded),
        mergeMap( () => this.coursesService.findAllCourses()),
        map( courses => new AllCoursesLoaded({courses}))
    );

    constructor(private actions$: Actions, private coursesService: CoursesService, private store: Store<AppState>) {}


}