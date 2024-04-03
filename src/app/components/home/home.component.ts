import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {createChart, IChartApi, ISeriesApi} from 'lightweight-charts';
import {ApiService} from "../../services/api.service";
import {filter, map, Observable, of, tap} from "rxjs";
import {Kline, KlinesResponse} from "../../interfaces/klines";
import * as moment from 'moment';
import {WindowService} from "../../services/window.service";

const format = "YYYY-MM-DD";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public graphData$!: Observable<any>;
  private _graph!: IChartApi;
  private _lineSeries!: ISeriesApi<any>
  @ViewChild('graph') graph!: ElementRef;

  constructor(
    private _apiService: ApiService,
    private _window: WindowService,
  ) {
  }

  ngAfterViewInit() {
    this.updateGraph();
  }

  ngOnInit() {
  }

  public updateGraph(timeRange?: string) {
    this.graphData$ = this._apiService.getKlinesData(
      {
        symbol: 'BTCUSDT',
        interval: timeRange || '1d'
      }
    ).pipe(
      filter(response => !!response && response.length),
      map((response: KlinesResponse[]) => {
        return response.map((item: any) => {

          const currentDate = new Date(Number(item[0]));

          const optionsItem: Kline = {
            time: moment(currentDate).format(format).toString(),
            open: Number(item[1]),
            high: Number(item[2]),
            low: Number(item[3]),
            close: Number(item[4]),
            label: {position: 'left,stick', size: 10}
          }
          return optionsItem;
        })
      }),
      tap((x: Kline[]) => {
        const markers = this._generateMarkers(x);
        if (!this._graph) {
          this._graph = createChart(this.graph.nativeElement, {
            width: this.graph.nativeElement.clientWidth,
            height: this.graph.nativeElement.clientHeight - 100
          });
          this._lineSeries = this._graph.addCandlestickSeries();
          this._lineSeries.setData(x);
          this._window.resize(this._graph, this.graph);

          this._lineSeries.setMarkers(markers as any);
        } else {
          this._lineSeries.setData(x);
          this._lineSeries.setMarkers(markers as any);
        }
      })
    );
  }

  public changeTimeRange(event: string) {
    this.updateGraph(event)
  }

  private _getRandomInt() {
    return Math.floor(Math.random() * 100); // 0 - 99
  }

  private _generateMarkers(data: Kline[]) {
    return data.map((item, index) => {
      if (this._getRandomInt() < 10) {
        const buyOrSell = this._getRandomInt();
        return {
          time: item.time,
          position: buyOrSell < 50 ? 'belowBar' : 'aboveBar',
          color: buyOrSell < 50 ? 'red' : 'green',
          shape: buyOrSell < 50 ? 'arrowDown' : 'arrowUp',
          text: buyOrSell < 50 ? 'SELL' : 'BUY',
          size: 1.5
        }
      }
      return null
    }).filter((mappedDataItem) => !!mappedDataItem)
  }
}




