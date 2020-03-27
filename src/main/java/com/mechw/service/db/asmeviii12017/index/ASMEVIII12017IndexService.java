package com.mechw.service.db.asmeviii12017.index;

import com.mechw.entity.db.asmeviii12017.ASMEVIII12017Index;
import com.mechw.model.db.asmeviii12017.index.IndexQuery;
import com.mechw.model.db.asmeviii12017.index.MaterialNameQuery;
import com.mechw.model.db.asmeviii12017.index.ProductFormQuery;

import java.util.List;

public interface ASMEVIII12017IndexService {

    List listMaterialName(MaterialNameQuery materialNameQuery);

    List listProductForm(ProductFormQuery productFormQuery);

    ASMEVIII12017Index getIndex(IndexQuery indexQuery);
}
