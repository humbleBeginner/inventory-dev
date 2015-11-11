<?php defined('SYSPATH') OR die('No direct access allowed.');

class Districts_Controller extends Dashboard_Controller {

    const ALLOW_PRODUCTION = FALSE;

    public function index(){
		$index = new View('districts/index');
		$index->districts = $this->district_model->find_all();
        $this->template->content = $index;
       # if(request::is_ajax() && request::method() === 'post')
    }

    public function save(){
    	if( request::is_ajax() && request::method() === 'post') {
    		$this->auto_render = FALSE;
    		$post = security::xss_clean( $this->input->post() );
    		$latest = json_helper::convert( $this->district_model->insert( $post ) );
			log_helper::add("1",$this->user_log,$this->user_id,"Added New District".$latest->name);
	
            echo json_encode( $latest );
    	}
    }

    public function delete($id){
        if( request::is_ajax() && request::method() === 'post') {
            $this->auto_render = FALSE;
			log_helper::add("1",$this->user_log,$this->user_id,"Deleted a District");
            echo $this->district_model->delete($id);
        }
    }

    public function update($id){
        if( request::is_ajax() && request::method() === 'post') {
            $this->auto_render = FALSE;

            $post = security::xss_clean($this->input->post('name'));
            $district = $this->district_model->find($id);
            $district->name = $post;
			log_helper::add("1",$this->user_log,$this->user_id,"Updated a District");
            echo $district->save($id);
        }
    }
}