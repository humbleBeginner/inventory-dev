<?php defined('SYSPATH') OR die('No direct access allowed.');

class log_helper_Core {

	public static function add($level,$username,$user_id,$action)
	{
		$log = ORM::factory('log');

		$data = array(
			"user" => $username,
			"level" =>$level,
			"user_id" =>$user_id,
			"action" => $action
		);
		
		$log->insert($data);
	}
	
}
?>