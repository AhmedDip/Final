<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\loginModel;
use App\Models\usersModel;
use Illuminate\Http\Request;

class adminAPI extends Controller
{
    public function userList()
    {
        $user = usersModel::all();
        return (response()->json([
            'status' => 200,
            'users' => $user
        ]));
    }

    public function completeEdit($id)
    {
        $user = usersModel::find($id);
        return (response()->json([
            'status' => 200,
            'users' => $user
        ]));
    }
    public function editingOparetion(Request $req, $id)
    {
        $validator = Validator::make($req->all(), [
            'address'    => ['required', 'min:5', 'max:50'],
            'user_name' => ['required', 'min:3', 'max:50', 'unique:users'],
            'email' => ['required', 'email', 'min:8', 'max:30', 'email:rfc'],
            'phone_number' => ['required', 'min:11', 'max:15',],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 201,
                'error' => $validator->errors(),
            ]);
        } else {
            DB::beginTransaction();
            try {

                $user = usersModel::find($id);
                $user->user_name = $req->user_name;
                $user->email = $req->email;
                $user->address = $req->address;
                $user->phone_number = $req->phone_number;
                $user->save();

                $login = loginModel::find($id);
                $login->user_name = $req->user_name;
                $login->save();
                DB::commit();

                return response()->json([
                    'status' => 200,
                ]);
            } catch (\Throwable $th) {
                DB::rollBack();
                return response()->json([
                    'status' => 201,
                ]);
                //throw $th;
            }
        }



        //return view('user.completeEdit')->with('users', $user);
    }
    public function blockUserOparetion($id)
    {
        DB::beginTransaction();
        try {
            $user = usersModel::find($id);
            $user->account_Status = 'Block';
            $user->save();
            $login = loginModel::find($id);
            $login->account_Status = 'Block';
            $login->save();
            DB::commit();
            return response()->json([
                'status' => 200,
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => 201,
            ]);
            //throw $th;
        }
    }
    public function unblockOperation($id)
    {
        //echo "done";
        DB::beginTransaction();
        try {
            $user = usersModel::find($id);
            $user->account_Status = 'active';
            $user->save();
            $login = loginModel::find($id);
            $login->account_Status = 'active';
            $login->save();
            DB::commit();
            return response()->json([
                'status' => 200,
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();

            return response()->json([
                'status' => 201,
            ]);
            //throw $th;
        }
    }
    public function pendingUserOparation($id)
    {
        DB::beginTransaction();
        try {
            $user = usersModel::find($id);
            $user->account_Status = 'active';
            $user->save();

            $login = loginModel::find($id);
            $login->account_Status = 'active';
            $login->save();
            DB::commit();
            return response()->json([
                'status' => 200,
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => 201,
            ]);

            //throw $th;
        }

        //return view('user.pendingUser')->with('user', $user);
    }
    public function destroy($id)
    {

        $user = usersModel::destroy($id);
        return response()->json([
            'status' => 200,
        ]);
    }
    public function insertUser(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'address'    => ['required', 'min:5', 'max:50'],
            'user_name' => ['required', 'min:3', 'max:50', 'unique:users'],
            'email' => ['required', 'email', 'unique:users', 'min:8', 'max:30', 'email:rfc'],
            'phone_number' => ['required', 'min:11', 'max:15',],
            'user_type' => ['required'],
            'password' => [
                'required',
                'min:8',
                'regex:/[a-z]/',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*#?&]/',
            ],
            'confirm_password' => ['required', 'same:password'],

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 201,
                'error' => $validator->errors(),
            ]);
        } else {
            DB::beginTransaction();
            try {
                // inserting into users table
                $user = new usersModel;
                $user->user_name = $req->user_name;
                $user->email = $req->email;
                $user->address = $req->address;
                $user->phone_number =  $req->phone_number;
                $user->profile_picture =  'null';
                $user->user_type =  $req->user_type;
                if ($req->user_type == 'admin') {
                    $user->account_Status =  'active';
                } else {
                    $user->account_Status =  'pending';
                }
                $user->save();

                $list = usersModel::all()->last();
                $id = $list['id'];

                // inserting into login table
                $login = new loginModel;
                $login->id =  $id;
                $login->user_name = $req->user_name;
                $login->password =  bcrypt($req->password);
                $login->user_type = $req->user_type;
                //  $login->account_Status = 'active';
                if ($req->user_type == 'admin') {
                    $login->account_Status =  'active';
                } else {
                    $login->account_Status =  'pending';
                }
                $login->save();
                DB::commit();
                return response()->json([
                    'status' => 200,
                ]);
            } catch (\Throwable $th) {
                DB::rollBack();
                return response()->json([
                    'status' => 201,
                ]);
            }
        }
    }



    public function loginVarify(Request $req)
    {
        $validator = Validator::make($req->all(), [

            'user_name' => ['required'],
            'password' => ['required'],

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 201,
                'error' => $validator->errors(),
            ]);
        } else {
            $user_name = $req->user_name;
            $password = bcrypt($req->password);

            $user = loginModel::where('user_name', $user_name)
                ->first();

            //checking users
            if ($user) {
                // checking account status
               
            if ($user['account_Status'] == 'Block') {
                    return response()->json([
                        'status' => 201,
                        'error' => "Your account is Block. Please contact with admin",
                    ]);
                } else {

                    if (Hash::check($req->password, $user['password'])) {
                        if ($user['user_type'] == 'admin') {

                            return response()->json([
                                'status' => 200,
                                'user' => $user,
                            ]);
                        } elseif ($user['user_type'] == 'student') {
                            // client
                            return response()->json([
                                'status' => 200,
                                'user' => $user,
                            ]);
                        } elseif ($user['user_type'] == 'teacher') {
                            return response()->json([
                                'status' => 200,
                                'user' => $user,
                            ]);
                        } else {
                            return response()->json([
                                'status' => 201,
                                'error' => "Password incorrect",
                            ]);
                        }
                    } else {
                        return response()->json([
                            'status' => 201,
                            'error' => "Invalid user name and password",
                        ]);
                    }
                }
            } else {
                return response()->json([
                    'status' => 201,
                    'error' => "Invalid user name and password",
                ]);
            }
        }
    }

}
