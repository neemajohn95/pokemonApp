import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokeServiceService, QueryParams } from '../services/poke-service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public list: any;
  public name: any;
  public url: any;
  public details: any;
  public image: Array<any> = [];
  public newList: Array<any> = [];
  request: QueryParams = {
    page: 0,
    pageSize: 10,
  };
  selection: any = 'Name';
  options: Array<object> = [{ name: 'Name' }, { name: 'Height' }, { name: 'Weight' }];
  totalCount: any;
  abilities: any;
  carddetails: any;
  rowSpan: any;
  srchName: any;
  srchAmbility: any;
  loading: boolean = false;
  public count: any;
  fullList: any;
  constructor(public service: PokeServiceService, public router: Router) { }

  ngOnInit(): void {
    const selected = sessionStorage.getItem('selection');
    if (selected) {
      this.selection = { name: selected };
    } 
    else { this.selection = this.selection; }
    this.getList(this.request);


  }

  getList(request: QueryParams) {
    this.newList = [];
    this.loading = true;
    this.service.getList(request)
      .subscribe(
        result => {
          this.list = result.results;
          this.totalCount = result.count;
          for (let i = 0; i < this.list.length; i++) {
            this.url = this.list[i].url;
            this.getPokemonDetails();
          }
        }
      );

  }

  getPokemonDetails() {
    this.service.getPokemonDetails(this.url).subscribe(
      result => {
        this.details = result;
        this.abilities = this.details['abilities'];
        const data = {
          id: this.details['id'],
          name: this.details['name'],
          img: this.details.sprites.other['official-artwork'].front_default,
          weight: this.details['weight'],
          height: this.details['height'],
          abilities: this.details['abilities'],
          baseExperience: this.details['base_experience'],
          forms: this.details['forms'],
          game_indices: this.details['game_indices'],
          moves: this.details['moves'],
          species: this.details['species'],
          stats: this.details['stats'],
          types: this.details['types']

        }
        this.newList.push(data);
        this.newList.sort((a, b) => (
          a.id - b.id
        ));
        this.count=this.newList.length;
        this.onSort();
        this.loading = false;
      }
    );
  }

  paginate(event: any) {
    this.loading = true;
    let first = event.first;
    let row = event.rows;
    this.request = {
      page: first,
      pageSize: row,
    }
    this.getList(this.request);
  }

  onSort() {
    if (this.selection.name) {
      sessionStorage.setItem('selection', this.selection.name);
    } else {
      sessionStorage.setItem('selection', this.selection);
    }
    if (this.selection == 'Weight' || this.selection.name == 'Weight') {
      this.newList.sort((a, b) => (
        a.weight - b.weight
      ));
    } else if (this.selection == 'Height' || this.selection.name == 'Height') {
      this.newList.sort((a, b) => (
        a.height - b.height
      ));
    }
    else if (this.selection == 'Name' || this.selection.name == 'Name') {
      this.newList.sort((a, b) => {
        return this.sortString(a, b, 'name')
      })
    }
  }

  sortString(a: any, b: any, name: any) {
    const obj1 = a[name].toUpperCase()
    const obj2 = b[name].toUpperCase()

    if (obj1 < obj2) {
      return -1
    }
    if (obj1 > obj2) {
      return 1
    }
    return 0
  }

  oncardClick(event: any) {
    this.newList.forEach(element => {
      if (element.id == event) {
        this.carddetails = element;
      }
    });
    this.service.cardDetails = this.carddetails;
    this.router.navigate(['/view-details']);
  }

  onSearch(event: any) {
    this.loading = true;
    let filteredList: Array<object> = [];
    if (this.srchName != '' && this.srchName != undefined) {
      sessionStorage.setItem('srchName', this.srchName);
      this.newList.forEach((element, index) => {
        if (element.name == this.srchName.toLowerCase()) {
          filteredList.push(element);
        }
      });
      this.newList = filteredList;
      this.count = this.newList.length;
      this.loading = false;
    } else if (this.srchAmbility != '' && this.srchAmbility != undefined) {
      this.newList.forEach((element) => {
        element.abilities.forEach((item: any) => {
          if (item.ability.name == this.srchAmbility.toLowerCase()) {
            filteredList.push(element);
          }
        });
      });
      this.newList = filteredList;
      this.count = this.newList.length;
      this.loading = false;
    }

    else {
      this.getList(this.request);

    }
  }
}
