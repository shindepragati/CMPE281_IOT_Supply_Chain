package com.smartsupplychain.foodsupplier;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDeleteExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;

@Component
public class CargoMasterDataDAOImpl {

	private DynamoDBMapper dynamoDBMapper;

	@Autowired
	public CargoMasterDataDAOImpl(DynamoDBMapper dynamoDBMapper) {
		this.dynamoDBMapper = dynamoDBMapper;
	}

	public CargoMasterDataPOJO addCargo(CargoMasterDataPOJO cargo) {
		dynamoDBMapper.save(cargo);
		return cargo;
	}

	public CargoMasterDataPOJO getCargo(String cargoId) {
		return dynamoDBMapper.load(CargoMasterDataPOJO.class, cargoId);
	}

	public PaginatedScanList<CargoMasterDataPOJO> getAllCargo() {
		return dynamoDBMapper.scan(CargoMasterDataPOJO.class, new DynamoDBScanExpression());
	}

	public CargoMasterDataPOJO updateCargo(CargoMasterDataPOJO cargos) {
		Map<String, ExpectedAttributeValue> expectedAttributeValueMap = new HashMap<>();
		expectedAttributeValueMap.put("cargoid",
				new ExpectedAttributeValue(new AttributeValue().withS(cargos.getCargoid())));
		DynamoDBSaveExpression saveExpression = new DynamoDBSaveExpression().withExpected(expectedAttributeValueMap);
		dynamoDBMapper.save(cargos, saveExpression);
		return cargos;
	}

	public PaginatedScanList<CargoMasterDataPOJO> deleteCargo(String userId) {
		Map<String, ExpectedAttributeValue> expectedAttributeValueMap = new HashMap<>();
		expectedAttributeValueMap.put("cargoid", new ExpectedAttributeValue(new AttributeValue().withS(userId)));
		DynamoDBDeleteExpression deleteExpression = new DynamoDBDeleteExpression()
				.withExpected(expectedAttributeValueMap);
		CargoMasterDataPOJO user = CargoMasterDataPOJO.builder().cargoid(userId).build();

		dynamoDBMapper.delete(user, deleteExpression);
		return dynamoDBMapper.scan(CargoMasterDataPOJO.class, new DynamoDBScanExpression());
	}

}
