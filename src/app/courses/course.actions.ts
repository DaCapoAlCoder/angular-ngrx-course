import { Action } from '@ngrx/store';
import { Course } from './model/course';

export enum CourseActionTypes {
                   //Source of the Action //Event linked to the action
    CourseRequested = '[View Course Page] Course Requested',

                    //Orgin of Action //Event linked to the action
    CourseLoaded = '[Courses API] Course loaded'
}


export class CourseRequested implements Action {
    readonly type = CourseActionTypes.CourseRequested;
    constructor(public payload: {courseId: number}) {}
}

export class CourseLoaded implements Action {
    readonly type = CourseActionTypes.CourseLoaded;
    constructor(public payload: {course: Course}) {}
}

export type CourseActions = CourseRequested | CourseLoaded;
