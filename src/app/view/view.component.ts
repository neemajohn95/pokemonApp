import { Component, OnInit } from '@angular/core';
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
    orderBy: 'name',
  };
  totalCount: any;
  abilities: any;
  constructor(public service: PokeServiceService) { }

  ngOnInit(): void {
    this.getList(this.request);
  }

  getList(request: QueryParams) {
    this.newList=[];
    this.service.getList(request)
      .subscribe(
        result => {
          console.log("firstlist", result);
          this.list = result.results;
          console.log(this.list);
          this.totalCount=result.count;
          for (let i = 0; i < this.list.length; i++) {

            this.url = this.list[i].url;
            this.getPokemonDetails();

          }
        }
      );
    console.log("new", this.newList);

  }
  getPokemonDetails() {
    this.service.getPokemonDetails(this.url).subscribe(
      result => {
        console.log("res", result);
        this.details = result;
         this.abilities=this.details['abilities'];
         console.log('this.abilities',this.abilities);
        const data = {
          id: this.details['id'],
          name: this.details['name'],
          img: this.details.sprites.other['official-artwork'].front_default,
          weight:this.details['weight'],
          height:this.details['height'],
          abilities:this.details['abilities']
        }
        this.newList.push(data);
        this.newList.sort((a, b) => (
          a.id - b.id
        ));
        // let img=this.details.sprites.other['official-artwork'].front_default;
        // this.image=img;

      }
    );
  }

  paginate(event:any){
    console.log("event", event);
    let first = event.first;
    let row = event.rows;
    let page = event.page;
    let noofPages =  event.pageCount;
    this.request={
      page: first,
      pageSize: row,
      orderBy: 'name',
    }
    this.getList(this.request);
  }
}
