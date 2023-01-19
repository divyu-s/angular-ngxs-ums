import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import {
  AddUser,
  DeleteUser,
  GetUsers,
  UpdateUser,
} from '../actions/app.action';
import { UserUtilityService } from '../userutility.service';

export class UserStateModel {
  users: any;
}

@State<UserStateModel>({
  name: 'appState',
  defaults: {
    users: [],
  },
})
@Injectable()
export class AppState {
  constructor(private ut: UserUtilityService) {}

  @Selector()
  static selectStateData(state: UserStateModel) {
    return state.users;
  }

  @Action(GetUsers)
  getDataFromTheState(con: StateContext<UserStateModel>) {
    return this.ut.fetchUsers().pipe(
      tap((returnData) => {
        const state = con.getState();
        con.setState({
          ...state,
          users: returnData,
        });
      })
    );
  }

  @Action(AddUser)
  addDataToState(con: StateContext<UserStateModel>, { payload }: AddUser) {
    return this.ut.addUser(payload).pipe(
      tap((returnData) => {
        const state = con.getState();
        con.patchState({
          users: [...state.users, returnData],
        });
      })
    );
  }

  @Action(UpdateUser)
  updateDataOfState(
    con: StateContext<UserStateModel>,
    { payload, id, i }: UpdateUser
  ) {
    return this.ut.updateUser(payload, id).pipe(
      tap((returnData) => {
        const state = con.getState();
        const users = [...state.users];
        users[i] = payload;
        con.setState({
          ...state,
          users,
        });
      })
    );
  }

  @Action(DeleteUser)
  deleteDataFromState(con: StateContext<UserStateModel>, { id }: UpdateUser) {
    return this.ut.deleteUser(id).pipe(
      tap((returnData) => {
        const state = con.getState();
        const users = state.users.filter((user: any) => user.id !== id);
        con.setState({
          ...state,
          users,
        });
      })
    );
  }
}
