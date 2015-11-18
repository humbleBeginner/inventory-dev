<?php defined('SYSPATH') OR die('No direct access allowed.');

class Logs_Controller extends Dashboard_Controller {

    const ALLOW_PRODUCTION = FALSE;

    public function index(){
		$index = new View('logs/index');
		$index->logs = $this->log_model->get_logs();
		//print_r($index);exit;
        $this->template->content = $index;
    }
	
	public function load_more_logs(){
		if( request::is_ajax() && request::method() === 'post'){
			$this->auto_render = FALSE;
			$id = $this->input->post("id");
			$logs = $this->log_model->get_more_logs($id);
			//return $logs;
			$html = "";
			$current_date = false;
			
			foreach($logs as $log){
			$profile_info = json_decode($log->user_avatar);
			if(!empty($profile_info->location)){
									$profile = $profile_info->location;
									}else{ 
									$profile = "assets/uploads/blankpic.png"; }
									
			 if(date("F d, Y",strtotime($log->current_date)) != $current_date){
							 $current_date = date("F d, Y",strtotime($log->current_date)); 
							 print_r($current_date);
						 }
									
			echo	"<div class=\"t-view postedlog\" data-tv-type=\"text\" id= \"$log->id\">
				<span><h4>".$current_date."</h4></span>
                 <div class=\"tv-header media\">
							<a href=\"#\" class=\"tvh-user pull-left\">
								<img class=\"img-responsive\" src=\"$profile\" alt=\"\">
							</a>	
				 <div class=\"media-body p-t-5\">
				<strong class=\"d-block\">".ucwords($log->user)."</strong>
				<small class=\"c-gray\">".date("F j, Y h:i:sa",strtotime($log->date_added))."</small>
				</div>
				
				</div>
                <div class=\"tv-body\">
                <p>$log->action</p>
				  </div>
				  </div>";
				
				}
			
			}
		}

    public function save(){
    	if( request::is_ajax() && request::method() === 'post') {
    		$this->auto_render = FALSE;
    		$post = security::xss_clean( $this->input->post() );
    		$latest = json_helper::convert( $this->district_model->insert( $post ) );
            echo json_encode( $latest );
    	}
    }
}