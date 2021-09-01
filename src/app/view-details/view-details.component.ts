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
  constructor(public service: PokeServiceService,public router:Router) { }

  ngOnInit(): void {
    this.cardDetails=this.service.cardDetails;
    console.log('inchild',this.cardDetails);
    this.imageUrl = this.cardDetails.img;
    this.name = this.cardDetails.name;
    this.height = this.cardDetails.height;
    this.weight = this.cardDetails.weight;
  }
  onBack(event:any){
    this.router.navigate(['view']); 
  }

}
