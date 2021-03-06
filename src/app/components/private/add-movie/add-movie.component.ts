import {Component, Inject, OnInit} from '@angular/core';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {FormGroup} from '@angular/forms';
import {ReserveSeatActions} from '../../public/state/seats.state';
import {Store} from '@ngxs/store';
import {AddMovieAction} from '../../public/movie.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  movieForm = new FormGroup({});

  movieFields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        label: 'Nazwa filmu',
        placeholder: 'Podaj nazwe filmu',
        required: true,
      }
    },
    {
      key: 'genres',
      type: 'select',
      templateOptions: {
        multiple: true,
        options: [{value: 'Action', label: 'Action'},
          {value: 'Adventure', label: 'Adventure'},
          {value: 'Comedy', label: 'Comedy'},
          {value: 'Drama', label: 'Drama'},
          {value: 'Family', label: 'Family'}],

        label: 'Nazwa gatunku',
        placeholder: 'Podaj nazwe gatunku',
        required: true,
      }
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'opis',
        placeholder: 'Wpisz opis',
        required: true
      }
    },
    {
      key: 'releaseDate',
      type: 'datepicker',
      templateOptions: {
        label: 'data wydania',
        placeholder: 'Wpisz date wydania',
        required: true
      }
    }
  ];


  constructor(public  matDialogRef: MatDialogRef<AddMovieComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public store: Store) {
  }


  ngOnInit() {
  }

  addMovie() {
    this.store.dispatch(new AddMovieAction({
      title: this.movieForm.value.title,
      genres: this.movieForm.value.genres,
      releaseDate: this.movieForm.value.releaseDate.toLocaleString().split(',')[0],
      description: this.movieForm.value.description
    }));
  }
}
