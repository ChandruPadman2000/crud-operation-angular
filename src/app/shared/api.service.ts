import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postStudents(data:any){
    return this.http.post("http://localhost:3000/posts",data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getStudents(){
    return this.http.get("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }

  updateStudents(data:any,id:number){
    return this.http.put("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteStudents(id:number){
    return this.http.delete("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }

}
