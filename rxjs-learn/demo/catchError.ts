import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

function getFromGoogle(): Observable<any> {
  return Observable.create(function subscribe(observer) {
    observer.next('https://google.com');
    observer.error({
      message: 'Google can\'t be reached.',
      status: 404,
    });
    observer.complete();
  });
}

function getFromBing(): Observable<any> {
  return Observable.create(function subscribe(observer) {
    observer.next('https://global.bing.com');
    observer.complete();
  });
}

function getFromBaidu(): Observable<any> {
  return Observable.create(function subscribe(observer) {
    observer.next('https://www.baidu.com');
    observer.complete();
  });
}

getFromGoogle().pipe(
  catchError(err => {
    console.error(`Error: ${err.status}: ${err.message}`);
    if (err.status === 404) {
      return getFromBaidu();
    } else {
      return getFromBing();
    }
  }))
  .pipe(map(x => `The site is : ${x}`))
  .subscribe(
    x => console.log('Subscriber got: ' + x),
    err => console.error(err),
    () => console.log('The stream is over.')
  );