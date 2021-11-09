import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { State } from '../state/app.state'

@Injectable({
    providedIn: 'root',
})
export class StateService {
    private customerState: any

    constructor(private store: Store<State>) {
        this.store
            .select((state) => state)
            .subscribe((customer) => {
                this.customerState = customer
            })
    }

    get getCurrentCustomer(): any {
        return this.customerState
    }
}
