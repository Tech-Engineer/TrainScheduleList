import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api-service.service';

interface StationsList {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'TrainScheduleTable';
  stationApiResponse: any = {payload: [{}]};
  stations: Array<StationsList> = [{name: '', code: ''}];
  isStationSelected: boolean = false;
  trainsDepartureList: any = {};
  
  constructor(private service: ApiService) {}

  ngOnInit() {
    this.fetchListOfStations();
  }

  async fetchListOfStations() {
    await this.service.fetchStations()
    .then((data: any) => {
      if(data.list) {
        this.stationApiResponse = data.list.payload
        this.stationApiResponse.forEach((element: { namen: { lang: string; }; code: string}) => {
          this.stations.push({name: element.namen.lang, code: element.code});
        });
      } else {
        throw JSON.stringify(data);
      }
    }).catch(err => console.log(JSON.parse(err)));        
  }

  async onSelectingAStation(event: any) {
    let stationCode = event.target.value;
    let stationName = event.target.options[event.target.options.selectedIndex].text;    
    await this.service.getTrainsDepartureList(stationCode)
    .then((list: any) => {
      if(list.departList) {
        this.trainsDepartureList = list.departList.payload.departures;
        this.isStationSelected = true;
      } else {
        throw JSON.stringify(list);
      }
    })
    .catch(err => console.log(JSON.parse(err)));
  }
}

