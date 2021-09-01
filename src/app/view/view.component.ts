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
    orderBy: 'name',
  };
  selection:any='Name';
  options:Array<object>=[{name:'Name'},{name:'Height'},{name:'Weight'}];
  totalCount: any;
  abilities: any;
  carddetails: any;
  rowSpan: any;
  constructor(public service: PokeServiceService,public router:Router) { }

  ngOnInit(): void {
    this.getList(this.request);
    
  }

  getList(request: QueryParams) {
    this.newList=[];
    this.service.getList(request)
      .subscribe(
        result => {
          this.list = result.results;

          this.totalCount=result.count;
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
         this.abilities=this.details['abilities'];
        const data = {
          id: this.details['id'],
          name: this.details['name'],
          img: this.details.sprites.other['official-artwork'].front_default,
          weight:this.details['weight'],
          height:this.details['height'],
          abilities:this.details['abilities'],
          baseExperience:this.details['base_experience'],
          forms:this.details['forms'],
          game_indices:this.details['game_indices'],
          moves:this.details['moves'],
          species:this.details['species'],
          stats:this.details['stats'],
          types:this.details['types']

        }
        this.newList.push(data);
        this.newList.sort((a, b) => (
          a.id - b.id
        ));
        // let img=this.details.sprites.other['official-artwork'].front_default;
        // this.image=img;
     
        this.onSort();
      }
    );
  }

  paginate(event:any){
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
  onSort(){
    if(this.selection=='Weight' || this.selection.name == 'Weight'){
      this.newList.sort((a, b) => (
        a.weight - b.weight
      ));
    } else if(this.selection=='Height'|| this.selection.name == 'Height'){
      this.newList.sort((a, b) => (
        a.height - b.height
      ));
    }
    else if(this.selection=='Name' || this.selection.name == 'Name'){
      this.newList.sort((a, b) => {
        return this.compareObjects(a, b, 'name')
      })
    }
   
    console.log('newList',this.newList);
  }
  compareObjects(a:any, b:any, name:any) {
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

  oncardClick(event:any){
console.log('shfak',event);

this.newList.forEach(element => {
  if(element.id ==event){
     this.carddetails = element;
  }
});
console.log('details',this.details);
this.service.cardDetails=this.carddetails;
this.router.navigate(['/view-details']); 
  }
}
