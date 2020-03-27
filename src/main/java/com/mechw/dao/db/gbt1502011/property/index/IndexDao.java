package com.mechw.dao.db.gbt1502011.property.index;

import com.mechw.entity.db.gbt1502011.property.Index;
import com.mechw.model.db.gbt1502011.property.index.*;

import java.util.List;

public interface IndexDao {

    List listCategory(CategoryQuery categoryQuery);

    List listType(TypeQuery typeQuery);

    List listSTD(STDQuery stdQuery);

    List listName(NameQuery nameQuery);

    Index getIndex(IndexQuery indexQuery);
}