<div class="nk-sidebar">
    <div class="nk-nav-scroll">
        <ul class="metismenu" id="menu">
            <li>
                <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                    <i class="icon-speedometer menu-icon"></i><span class="nav-text"> <strong>Welcome
                            {{session('user_name')}}</span></strong>
                </a>
                <ul aria-expanded="false">
                    <li><a href="{{route('user.dashbord')}}"><i class="fa fa-lock"></i>Admin</a></li>
                    <!-- <li><a href="./index-2.html">Home 2</a></li> -->
                </ul>
            </li>
            <li class="mega-menu mega-menu-sm">
                <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                    <i class="icon-globe-alt menu-icon"></i><span class="nav-text">Manage Users</span>
                </a>
                <ul aria-expanded="false">

                    <li><a href="{{route('user.add_user')}}">Add users</a></li>
                    <li><a href="{{route('user.user_list')}}">Users List</a></li>
                 
            <li><a href="{{route('user.delete_user')}}">Delete Users</a></li>
            <li><a href="{{route('user.edit_user')}}">Edit Users</a></li>
            <li><a href="{{route('user.block_user')}}">Block Users</a></li>
          
    </div>
</div>