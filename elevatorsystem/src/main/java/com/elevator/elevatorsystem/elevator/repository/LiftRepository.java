package com.elevator.elevatorsystem.elevator.repository;

import com.elevator.elevatorsystem.elevator.domain.Lift;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LiftRepository extends ListCrudRepository<Lift, UUID>, JpaSpecificationExecutor<Lift> {
    List<Lift> findAllByBuildingId(UUID buildingId);
}
