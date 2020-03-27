package com.mechw.service.db.nbt4700312009.property.index;

import com.mechw.entity.db.nbt4700312009.property.Index;
import com.mechw.model.db.nbt4700312009.property.index.*;

import java.util.List;

public interface MtlIndexService {

    List listCategory(Temp temp);

    List listType(Category category);

    List listSTD(Type type);

    List listName(STD std);

    Index getIndex(Name name);

}
