package com.smartsupplychain.foodsupplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedList;


@RestController
public class CargoController {

	private CargoServiceImpl cargoservice;
	private CargoMasterDataServiceImpl cargomasterdataservice;

	@Autowired
	public CargoController(CargoServiceImpl cargoservice) {
		this.cargoservice = cargoservice;
	}

	@RequestMapping(value = "/cargos/add", produces = { "application/json" }, method = RequestMethod.POST)
	public ResponseEntity createCargos(@RequestBody CargoPOJO cargospojo) {
		try {
			//System.out.println("Came to controller,........"+cargospojo.getSensorslist());
			CargoPOJO response = cargoservice.addCargo(cargospojo);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (AmazonServiceException e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.valueOf(e.getStatusCode()), e.getMessage(), e);
		} catch (AmazonClientException e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}
//	
//	@RequestMapping(value = "/cargos", produces = { "application/json" }, method = RequestMethod.GET)
//	public ResponseEntity getAllCargo() {
//		try {
//			PaginatedList<DynamoDBCargoPOJO> response = cargoservice.getAllCargo();
//			return ResponseEntity.status(HttpStatus.OK).body(response);
//		} catch (AmazonServiceException e) {
//			throw new ResponseStatusException(HttpStatus.valueOf(e.getStatusCode()), e.getMessage(), e);
//		} catch (AmazonClientException e) {
//			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
//		}
//	}
	
	@RequestMapping(value = "/cargos", produces = { "application/json" }, method = RequestMethod.GET)
	public ResponseEntity getAllCargo() {
		try {
			PaginatedList<CargoPOJO> response = cargoservice.getAllCargo();
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (AmazonServiceException e) {
			throw new ResponseStatusException(HttpStatus.valueOf(e.getStatusCode()), e.getMessage(), e);
		} catch (AmazonClientException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}
	
	@RequestMapping(value = "/cargos/allsensors", produces = { "application/json" }, method = RequestMethod.GET)
	public ResponseEntity getAllSensors() {
		try {
			PaginatedList<CargoPOJO> response = cargoservice.getAllCargo();
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (AmazonServiceException e) {
			throw new ResponseStatusException(HttpStatus.valueOf(e.getStatusCode()), e.getMessage(), e);
		} catch (AmazonClientException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}


	@RequestMapping(value = "/cargos/byid/{cargoID}", produces = { "application/json" }, method = RequestMethod.GET)
	public ResponseEntity getCargoById(@PathVariable String cargoID) {
		try {
			CargoPOJO response = cargoservice.getCargo(cargoID);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (AmazonServiceException e) {
			throw new ResponseStatusException(HttpStatus.valueOf(e.getStatusCode()), e.getMessage(), e);
		} catch (AmazonClientException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}

	
	
	@RequestMapping(value = "/cargos/update", produces = { "application/json" }, method = RequestMethod.PUT)
	public ResponseEntity updateCargo(@RequestBody CargoPOJO cargospojo) {
		try {
			CargoPOJO response = cargoservice.updateCargo(cargospojo);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (AmazonServiceException e) {
			throw new ResponseStatusException(HttpStatus.valueOf(e.getStatusCode()), e.getMessage(), e);
		} catch (AmazonClientException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}

	@RequestMapping(value = "/cargos/{cargoid}", produces = { "application/json" }, method = RequestMethod.DELETE)
	public ResponseEntity deleteCargo(@PathVariable(required = true, name = "snmid") String snmid) {
		try {
			PaginatedList<CargoPOJO> response  = cargoservice.deleteCargo(snmid);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (AmazonServiceException e) {
			throw new ResponseStatusException(HttpStatus.valueOf(e.getStatusCode()), e.getMessage(), e);
		} catch (AmazonClientException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}
}
