import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import Tale from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Tile from 'ol/layer/Tile';
import View from 'ol/View';
import { fromLonLat, toLonLat,transform } from 'ol/proj';
import Overlay from 'ol/Overlay';
import { from, map } from 'rxjs';
import { toStringHDMS } from 'ol/coordinate';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
map:Map;
xCoordinate:number;
yCoordinate:number;
  constructor() { }

  ngOnInit(): void {
    this.initilizeMap();
  }

  initilizeMap(){
     const container = document.getElementById('popup');
     const content = document.getElementById('popup-content');
     const closer = document.getElementById('popup-closer');
     const overlay = new Overlay({element: container, autoPan: true, autoPanAnimation:{duration:250}})

    this.map = new Map({
      target: 'map',
      layers: [new Tile({source: new OSM()})],
      view: new View({center: [3633693.5014097732, 4844188.394682496], zoom: 16.5, minZoom:5.8})
    });

    this.map.on('singleclick', function (evt){
      const coordinate = evt.coordinate;
      console.log(coordinate);
      this.xCoordinate=transform(coordinate, 'EPSG:3857', 'EPSG:4326')[0];
      this.yCoordinate=transform(coordinate, 'EPSG:3857', 'EPSG:4326')[1];
      console.log(this.xCoordinate);
      console.log(this.yCoordinate);
      
      // content.innerHTML = '<p>Current coordinates are : </p><code>' +hdms + '</code>';
       overlay.setPosition(coordinate);
    });

     
  }
  getCoord(event: any){
    
       var coordinate = this.map.getEventCoordinate(event);
       this.xCoordinate=transform(coordinate, 'EPSG:3857', 'EPSG:4326')[0];
       this.yCoordinate=transform(coordinate, 'EPSG:3857', 'EPSG:4326')[1];
       console.log(this.xCoordinate);
       console.log(this.yCoordinate);
      //  this.service.formModel.controls['xCoordinates'].setValue(this.xCoordinate);
      //  this.service.formModel.controls['koordinatY'].setValue(this.yCoordinate);
      //  let ref = document.getElementById('cancel')
      //  ref.click();
    
 }
}
