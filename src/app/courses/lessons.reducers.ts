import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Lesson } from './model/lesson';
import { CourseActions } from './course.actions';

export interface LessonsState extends EntityState<Lesson> { }

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>();

const initialLessonsState = adapter.getInitialState();

export function lessonsReducer(state: LessonsState = initialLessonsState, action: CourseActions): LessonsState {
    switch (action.type) {
        default:
            return state;
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
