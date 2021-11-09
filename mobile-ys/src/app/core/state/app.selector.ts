import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector,
} from '@ngrx/store'
import { InitStatusEnum } from '../enums/init-status.enum'
import { State } from './app.state'

export const selectAuth = createFeatureSelector<State>('auth')

export const selectCustomer = createFeatureSelector<State>('app')
export const getCustomer = (): MemoizedSelector<object, State> =>
    createSelector(selectCustomer, (state: State) => state)

export const isInitModuleFinished = (): MemoizedSelector<object, boolean> =>
    createSelector(
        selectCustomer,
        (state: State) => state.moduleStatus == InitStatusEnum.finished
    )
