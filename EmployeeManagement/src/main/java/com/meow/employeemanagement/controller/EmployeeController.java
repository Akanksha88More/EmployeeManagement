package com.meow.employeemanagement.controller;

import com.meow.employeemanagement.model.Employee;
import com.meow.employeemanagement.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees(){
        return employeeService.getAllEmployees();
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<Optional<Employee>> getEmployeeById(@PathVariable long id){
        return employeeService.findEmployeeById(id);
    }

    @PostMapping("/employee")
    public ResponseEntity<Employee> saveEmployee(@RequestBody Employee employee){
        return employeeService.saveEmployee(employee);
    }

    @PostMapping("/employee/update/{id}")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee, @PathVariable long id) {
        return employeeService.updateEmployee(employee, id);
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable long id){
        return employeeService.deleteEmployee(id);
    }
    
}
