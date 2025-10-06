package com.meow.employeemanagement.service;

import com.meow.employeemanagement.dao.EmployeeDao;
import com.meow.employeemanagement.model.Employee;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeDao employeeDao;

    public EmployeeService(EmployeeDao employeeDao) {
        this.employeeDao = employeeDao;
    }

    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employeeList = employeeDao.findAll();
        return ResponseEntity.ok(employeeList);
    }

    public ResponseEntity<Optional<Employee>> findEmployeeById(long id) {
        Optional<Employee> employee = employeeDao.findById(id);
        return ResponseEntity.ok(employee);
    }

    public ResponseEntity<Employee> saveEmployee(Employee employee) {
        Employee savedEmployee = employeeDao.save(employee);
        return ResponseEntity.ok(savedEmployee);
    }

    public ResponseEntity<Employee> updateEmployee(Employee employee, long id) {
        Optional<Employee> existingEmployee = employeeDao.findById(id);
        if (existingEmployee.isPresent()) {
            Employee empToUpdate = existingEmployee.get();
            empToUpdate.setName(employee.getName());
            empToUpdate.setEmail(employee.getEmail());
            empToUpdate.setPosition(employee.getPosition());
            Employee updatedEmployee = employeeDao.save(empToUpdate);
            return ResponseEntity.ok(updatedEmployee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<String> deleteEmployee(long id) {
        Optional<Employee> existingEmployee = employeeDao.findById(id);
        if (existingEmployee.isPresent()) {
            employeeDao.deleteById(id);
            return ResponseEntity.ok("Employee deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
