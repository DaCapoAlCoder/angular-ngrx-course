import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { CourseRequested, CourseActionTypes, CourseLoaded } from './course.actions';
import { mergeMap, map } from 'rxjs/operators';
import { CoursesService } from './services/courses.service';

@Injectable()
export class CourseEffects {

    @Effect()
    loadCourses$ = this.actions$
    .pipe(
        ofType<CourseRequested>(CourseActionTypes.CourseRequested),
        mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
        map( course => new CourseLoaded({course}))
    );

    constructor(private actions$: Actions, private coursesService: CoursesService) {}


}