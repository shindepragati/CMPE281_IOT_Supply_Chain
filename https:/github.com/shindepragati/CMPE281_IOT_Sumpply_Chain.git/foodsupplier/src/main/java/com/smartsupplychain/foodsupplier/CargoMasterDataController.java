package com.smartsupplychain.foodsupplier;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

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
public class CargoMasterDataController {

	private CargoMasterDataServiceImpl cargoservice;
	private CargoDAOImpl cservice;

	@Autowired
	public CargoMasterDataController(CargoMasterDataServiceImpl cargoservice,CargoDAOImpl cservice) {
		this.cargoservice = cargoservice;
		this.cservice = cservice;
	}

//	private CargoMasterDataPOJO resetnullvalues(CargoMasterDataPOJO cargospojo) {
//		Random rn = new Random();
////		int range = maximum - minimum + 1;
////		int randomNum =  rn.nextInt(range) + minimum;
//		
//		if(cargospojo.getTemperature()==null || cargospojo.getTemperature().equalsIgnoreCase("")) {
//			int maximum=37;
//			int minimum=9;
//			int range = maximum - minimum + 1;
//			int randomNum =  rn.nextInt(range) + minimum;
//			cargospojo.setTemperature(Integer.toString(randomNum));
//		}
//		if(cargospojo.getHumidity()==null || cargospojo.getHumidity().equalsIgnoreCase("")) {
//			int maximum=100;
//			int minimum=20;
//			int range = maximum - minimum + 1;
//			int randomNum =  rn.nextInt(range) + minimum;
//			cargospojo.setHumidity(Integer.toString(randomNum));
//		}
//		if(cargospojo.getLight()==null || cargospojo.getLight().equalsIgnoreCase("")) {
//			int maximum=100;
//			int minimum=20;
//			int range = maximum - minimum + 1;
//			int randomNum =  rn.nextInt(range) + minimum;
//			cargospojo.setLight(Integer.toString(randomNum));
//		}
//		
//		if(cargospojo.getWeight()==null || cargospojo.getWeight().equalsIgnoreCase("")) {
//			int maximum=400;
//			int minimum=100;
//			int range = maximum - minimum + 1;
//			int randomNum =  rn.nextInt(range) + minimum;
//			cargospojo.setWeight(Integer.toString(randomNum));
//		}
//		
//		if(cargospojo.getPackages()==null || cargospojo.getPackages().equalsIgnoreCase("")) {
//			String[] arr= {"veggies","meat","drinks","fruits","pork","honey"};
//			int maximum=5;
//			int minimum=0;
//			int range = maximum - minimum + 1;
//			int randomNum =  rn.nextInt(range) + minimum;
//			cargospojo.setWeight(arr[randomNum]);
//		}
//		if(cargospojo.getCargo_comapny()==null || cargospojo.getPackages().equalsIgnoreCase("")) {
//			String[] arr= {"veggies","meat","drinks","fruits","pork","honey"};
//			int maximum=5;
//			int minimum=0;
//			int range = maximum - minimum + 1;
//			int randomNum =  rn.nextInt(range) + minimum;
//			cargospojo.setWeight(arr[randomNum]);
//		}
//		return cargospojo;
//		
//	}
	@RequestMapping(value = "/customerorders/add", produces = { "application/json" }, method = RequestMethod.POST)
	public ResponseEntity createCargos(@RequestBody CargoMasterDataPOJO cargospojo) {
		try {
			System.out.println("testt-->"+cargospojo.getCargoid());
			CargoPOJO res =cservice.getCargo(cargospojo.getCargoid());
			cargospojo.setCargo_comapny(res.getCargo_comapny());
			cargospojo.setCargo_type(res.getCargo_type());
			cargospojo.setCargo_reg_id(res.getCargo_reg_id());
			Map<String,String> cargosensorlist =res.getSensorlist();
			Map<String,String> customersensorlist =res.getSensorlist();
			Map<String,String> finalsl = new HashMap<String, String>();
			for (String k : cargosensorlist.keySet())
	        {
	            if (customersensorlist.get(k).equals(cargosensorlist.get(k))) {
	                
	            	finalsl.put(k, customersensorlist.get(k));
	            }
	        } 
			cargospojo.setCargo_status(res.getCargo_status());
			cargospojo.setSensorlist(finalsl);
			cargospojo.setDriver_name(res.getDriver_name());
			cargospojo.setDriver_address(res.getDriver_address());
			cargospojo.setDriver_phonenumber(res.getDriver_phonenumber());
			cargospojo.setLicense_no(res.getLicense_no());
			CargoMasterDataPOJO response = cargoservice.addCargo(cargospojo);
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
	
	@RequestMapping(value = "/customerorders", produces = { "application/json" }, method = RequestMethod.GET)
	public ResponseEntity getAllCargo() {
		try {
			PaginatedList<CargoMasterDataPOJO> response = cargoservice.getAllCargo();
			
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (AmazonServiceException e) {
			throw new ResponseStatusException(HttpStatus.valueOf(e.getStatusCode()), e.getMessage(), e);
		} catch (AmazonClientException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}
	
//	@RequestMapping(value = "/cargos/allsensors", produces = { "application/json" }, method = RequestMethod.GET)
//	public ResponseEntity getAllSensors() {
//		try {
//			PaginatedList<CargoPOJO> response = cargoservice.getAllCargo();
//			return ResponseEntity.status(HttpStatus.OK).body(response);
//		} catch (AmazonServiceException e) {
//			throw new ResponseStatusException(HttpStatus.valueOf(e.getStatusCode()), e.getMessage(), e);
//		} catch (AmazonClientException e) {
//			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
//		}
//	}


	@RequestMapping(value = "/customerorders/byid/{cargoID}", produces = { "application/json" }, method = RequestMethod.GET)
	public ResponseEntity getCargoById(@PathVariable String cargoID) {
		try {
			CargoMasterDataPOJO response = cargoservice.getCargo(cargoID);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (AmazonServiceException e) {
			throw new ResponseStatusException(HttpStatus.valueOf(e.getStatusCode()), e.getMessage(), e);
		} catch (AmazonClientException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}

	
	
	@RequestMapping(value = "/customerorders/update", produces = { "application/json" }, method = RequestMethod.PUT)
	public ResponseEntity updateCargo(@RequestBody CargoMasterDataPOJO cargospojo) {
		try {
			CargoMasterDataPOJO response = cargoservice.updateCargo(cargospojo);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (AmazonServiceException e) {
			throw new ResponseStatusException(HttpStatus.valueOf(e.getStatusCode()), e.getMessage(), e);
		} catch (AmazonClientException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}

	@RequestMapping(value = "/customerorders/delete/{cargoid}", produces = { "application/json" }, method = RequestMethod.DELETE)
	public ResponseEntity deleteCargo(@PathVariable(required = true, name = "cargoid") String snmid) {
		try {
			PaginatedList<CargoMasterDataPOJO> response  = cargoservice.deleteCargo(snmid);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (AmazonServiceException e) {
			throw new ResponseStatusException(HttpStatus.valueOf(e.getStatusCode()), e.getMessage(), e);
		} catch (AmazonClientException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
		}
	}
	
	String getLang() {
		return null;
		
	}
	
	String getLat() {
		return null;
		
	}
}
