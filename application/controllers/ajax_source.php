<?php defined('SYSPATH') OR die('No direct access allowed.');

class Ajax_Source_Controller extends Controller {

  public function admin(){
    $suppliers = $this->supplier_model->getAll(TRUE);
    $categories = $this->category_model->getAll(TRUE);
    $items = $this->item_model->getAllOnStock();
    foreach ($items as $key => $value) {
        $arr[$key] = $value;
    }
    $items = $arr;
    
    $settings = $this->setting_model->find(1)->as_array();
    $reference_numbers = $this->request_model->getReferenceNumbers();
    $districts = $this->district_model->getAll(TRUE);
    $offices = $this->office_model->getAll(TRUE);

    echo json_encode(compact('suppliers', 'categories', 'items', 'districts','offices','reference_numbers','settings')) ;
  }

  public function office(){
    $auth = new Auth;
    $office_id = $auth->get_user()->id;
    $items = $this->item_model->getAllOnStock();

    $budget_record = $this->budget_model->where('office_id',$office_id);
    if($budget_record->count_all() > 0){
      $budget = $budget_record->find()->as_array();
    }else{
      $budget = [];
    }
    foreach ($items as $key => $value) {
        $arr[$key] = $value;
    }
    $items = $arr;
   
    echo json_encode(compact('items','budget','id'));
  }

}
