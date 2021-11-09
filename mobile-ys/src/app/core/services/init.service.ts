import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import * as Auth from 'src/app/core/state/app.action'
import { Observable } from 'rxjs'
import { isInitModuleFinished } from '../state/app.selector'
import { State } from '../state/app.state'
@Injectable({
    providedIn: 'root',
})
export class InitService {
    constructor(private store: Store<State>) {}

    startInitModule() {
        this.store.dispatch(new Auth.GetAuthenticatedClient())
    }
    isInitModuleFinished(): Observable<boolean> {
        return this.store.select(isInitModuleFinished())
    }
}
