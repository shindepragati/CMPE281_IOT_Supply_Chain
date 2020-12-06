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
public class CargoDAOImpl {

	private DynamoDBMapper dynamoDBMapper;

	@Autowired
	public CargoDAOImpl(DynamoDBMapper dynamoDBMapper) {
		this.dynamoDBMapper = dynamoDBMapper;
	}

	public CargoPOJO addCargo(CargoPOJO cargo) {
		dynamoDBMapper.save(cargo);
		return cargo;
	}

	public CargoPOJO getCargo(String cargoId) {
		return dynamoDBMapper.load(CargoPOJO.class, cargoId);
	}
	
	
	public PaginatedScanList<CargoPOJO> getAllCargo() {
		return dynamoDBMapper.scan(CargoPOJO.class, new DynamoDBScanExpression());
	}

	public CargoPOJO updateCargo(CargoPOJO cargos) {
		Map<String, ExpectedAttributeValue> expectedAttributeValueMap = new HashMap<>();
		expectedAttributeValueMap.put("cargoid",
				new ExpectedAttributeValue(new AttributeValue().withS(cargos.getCargoid())));
		DynamoDBSaveExpression saveExpression = new DynamoDBSaveExpression().withExpected(expectedAttributeValueMap);
		dynamoDBMapper.save(cargos, saveExpression);
		return cargos;
	}

	public PaginatedScanList<CargoPOJO> deleteCargo(String userId) {
		Map<String, ExpectedAttributeValue> expectedAttributeValueMap = new HashMap<>();
		expectedAttributeValueMap.put("cargoid", new ExpectedAttributeValue(new AttributeValue().withS(userId)));
		DynamoDBDeleteExpression deleteExpression = new DynamoDBDeleteExpression()
				.withExpected(expectedAttributeValueMap);
		CargoPOJO user = CargoPOJO.builder().cargoid(userId).build();

		dynamoDBMapper.delete(user, deleteExpression);
		return dynamoDBMapper.scan(CargoPOJO.class, new DynamoDBScanExpression());
	}
}
