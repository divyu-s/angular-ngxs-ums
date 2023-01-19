import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AddUser,
  DeleteUser,
  GetUsers,
  UpdateUser,
} from '../actions/app.action';
import { AppState } from '../store/app.store';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  userForm: FormGroup | any;
  userInfo: [] | any = [];
  @Select(AppState.selectStateData) userInfo$: Observable<any> | undefined;

  constructor(private store: Store, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [''],
      name: [''],
      username: [''],
      email: [''],
      phone: [''],
      website: [''],
    });

    this.store.dispatch(new GetUsers());
    this.userInfo$?.subscribe((returnData) => {
      this.userInfo = returnData;
    });
  }

  addUser() {
    this.store.dispatch(new AddUser(this.userForm.value));
    this.userForm.reset();
  }

  updateUser(id: number, i: number) {
    const newData = {
      id: id,
      name: 'Divyanshu',
      username: 'divyanshu',
      email: 'divyanshu@test.com',
      phone: '000000',
      website: 'www.divyanshu.com',
    };
    this.store.dispatch(new UpdateUser(newData, id, i));
  }

  deleteUser(id: number) {
    this.store.dispatch(new DeleteUser(id));
  }
}
