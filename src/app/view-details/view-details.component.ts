import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokeServiceService } from '../services/poke-service.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  cardDetails: any;
  imageUrl:string='';
  name:string='';
  height: any;
  weight: any;
  species: any;
  types: any;
  stats: any;
  forms: any;
  constructor(public service: PokeServiceService,public router:Router) { }

  ngOnInit(): void {
    const savedDetails =  sessionStorage.getItem('cardDetails');
  
    if (!this.service.cardDetails && savedDetails) {
      this.cardDetails = JSON.parse(savedDetails);
    } else{
    this.cardDetails=this.service.cardDetails;
    }
  
    console.log('inchild',this.cardDetails);
    sessionStorage.setItem('cardDetails',JSON.stringify(this.cardDetails));
    this.imageUrl = this.cardDetails.img;
    this.name = this.cardDetails.name;
    this.height = this.cardDetails.height;
    this.weight = this.cardDetails.weight;
    this.species =this.cardDetails.species.name;
    this.types=this.cardDetails.types;
    this.stats = this.cardDetails.stats;
    this.forms=this.cardDetails.forms;
  }
  onBack(event:any){
    this.router.navigate(['view']); 
  }

}
