import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { studentModel } from './studentdash.model';

@Component({
  selector: 'app-studentdash',
  templateUrl: './studentdash.component.html',
  styleUrls: ['./studentdash.component.css']
})
export class StudentdashComponent implements OnInit {

  formvalue!:FormGroup;
  stumodel: studentModel=new studentModel();
  studentData!:any
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formvalue=this.formbuilder.group(
      {
        name:new FormControl(''),
        email:[''],
        mob:[''],
        fee:['']
      }
    )
    this.getAllStudents();
  }
 clickAddStudents(){
  this.formvalue.reset();
  this.showAdd=true;
  this.showUpdate=false;
 }
  postStudentDetails(){
    console.log(this.stumodel.name);
    this.stumodel.name = this.formvalue.value.name;
    this.stumodel.email = this.formvalue.value.email;
    this.stumodel.mob = this.formvalue.value.mob;
    this.stumodel.fee = this.formvalue.value.fee;

    this.api.postStudents(this.stumodel).subscribe(res=>{
      console.log(res);
      alert("Students record Added Successfully")
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formvalue.reset();
      this.getAllStudents();//for Instance update data
     
    
    },
    err=>{
      alert("Somethng wents wrong!!!! Check again...")
    })
  }
getAllStudents(){ //get API done
  this.api.getStudents().subscribe(res=>{
    this.studentData = res;
  })

  }
  deleteStudents(s:any){  //delete API done
    this.api.deleteStudents(s.id).subscribe(res=>{
      alert("Students record Deleted");
      this.getAllStudents();
    });
  }
  onEdit(s : any){
    this.showAdd=false;
    this.showUpdate=true;
    this.stumodel.id=s.id;
    this.formvalue.controls['name'].setValue(s.name);
    this.formvalue.controls['email'].setValue(s.email);
    this.formvalue.controls['mob'].setValue(s.mob);
    this.formvalue.controls['fee'].setValue(s.fee);
}

updateStudentDetails(){
  this.stumodel.name = this.formvalue.value.name;
  this.stumodel.email = this.formvalue.value.email;
  this.stumodel.mob = this.formvalue.value.mob;
  this.stumodel.fee = this.formvalue.value.fee;

  this.api.updateStudents(this.stumodel,this.stumodel.id).subscribe(res=>{
    alert("Students Record Updated")
    let ref = document.getElementById('cancel');
    ref?.click();
    this.formvalue.reset();
    this.getAllStudents();//for Instance update data
  })
}
 
}
