import { useEffect, useState } from "react";
import { getUserFollowingThunk } from "../../../store/users";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../../store/session";
import { followUserThunk, loadUserFollowing, unfollowUserThunk, getUserThunk } from "../../../store/users";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./UserProfile.css"

export default function UserProfile() {

    const { id } = useParams()
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getUserThunk(id))
    }, [])

    const dispatch = useDispatch();
    const following = useSelector(loadUserFollowing)
    const user = useSelector((state) => state.users.user)

    const followSubmit = async () => {
        await dispatch(followUserThunk(user.id))
        await dispatch(authenticate())
    }

    const unFollowSubmit = async () => {
        await dispatch(unfollowUserThunk(user.id))
        await dispatch(authenticate())
    }


    const followButtonRender = () => {
        if (followingBoolean) {
            return (
                <button onClick={unFollowSubmit} className={`user-profile-unfollow-submit-container w-[125px]`}></button>
            )
        } else {
            return (
                <button onClick={followSubmit} className={`user-profile-follow-submit-container w-[125px]`}>Follow</button>
            )
        }
    }

    const [followingBoolean, setFollowingBoolean] = useState(false)

    useEffect(() => {
        const followingIds = following.map((followedUser) => {
            return followedUser.id
        })
        if (!followingIds.includes(user.id)) {
            setFollowingBoolean(false)
        } else {
            setFollowingBoolean(true)
        }
    }, [following])

    useEffect(() => {
        const getFollowing = async () => {
            await dispatch(getUserFollowingThunk())
        };
        getFollowing();
    }, [dispatch]);

    if (!user.first_name) {
        return (
            <></>
        )
    }

    return (
        <div className="p-4 md:p-16 max-w-[1500px] m-auto">
            <div className="p-8 bg-white shadow mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {user.id === sessionUser.id ? <div></div> :
                        <div className="grid grid-cols-2 text-center order-last md:order-first mt-10 md:mt-20 md:mt-0 w-[250px] mx-auto">
                            <div>
                                <p className="font-bold text-gray-700 text-xl">{user.followers_count}</p>
                                <p className="text-gray-400">Followers</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">{user.following_count}</p>
                                <p className="text-gray-400">Following</p>
                            </div>
                            {/* <div>
                            <p className="font-bold text-gray-700 text-xl">89</p>
                            <p className="text-gray-400">Comments</p>
                        </div> */}
                        </div>}

                    <div className="relative">
                        {/* <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div> */}

                        <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-slate-700">
                            {user.profile_picture ?
                                <img className="w-48 h-48 rounded-full" src={user.profile_picture}></img>
                                :
                                <i className="fas fa-user-circle text-[192px]" />

                            }
                        </div>
                    </div>

                    {user.id === sessionUser.id ? <div className="mt-20"></div> :

                        <div className="flex flex-col mx-auto items-center justify-center mt-32 md:mt-20 md:justify-center">
                            {/* <button
                            className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        >
                            Connect
                        </button> */}
                          <h1 className="block md:hidden text-4xl font-medium text-gray-700">{user.first_name} {user.last_name} {user.age ? <span className="font-light text-gray-500">, 27</span> : <></>}</h1>
                            {followButtonRender()}
                        </div>

                    }
                </div>

                {user.id === sessionUser.id ?                 <div className="mt-20 text-center border-b pb-12">
                    {user.id === sessionUser.id ? <h1 className="text-4xl font-medium text-gray-700">{user.first_name} {user.last_name} {user.age ? <span className="font-light text-gray-500">, 27</span> : <></>}</h1> :
                    <h1 className="hidden md:block text-4xl font-medium text-gray-700">{user.first_name} {user.last_name} {user.age ? <span className="font-light text-gray-500">, 27</span> : <></>}</h1>
                    }

                    {user.location ? <p className="font-light text-gray-600 mt-3">Bucharest, Romania</p> : <></>}
                    {user.id === sessionUser.id ?
                        <div className="grid grid-cols-2 text-center order-last md:order-first mt-10 md:mt-0 mx-auto w-[250px]">
                            <div>
                                <p className="font-bold text-gray-700 text-xl">{user.followers_count}</p>
                                <p className="text-gray-400">Followers</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">{user.following_count}</p>
                                <p className="text-gray-400">Following</p>
                            </div>
                            {/* <div>
                            <p className="font-bold text-gray-700 text-xl">89</p>
                            <p className="text-gray-400">Comments</p>
                        </div> */}
                        </div> :
                        <></>}
                </div> :

                <div className="mt-10 text-center border-b pb-12">
                {user.id === sessionUser.id ? <h1 className="text-4xl font-medium text-gray-700">{user.first_name} {user.last_name} {user.age ? <span className="font-light text-gray-500">, 27</span> : <></>}</h1> :
                <h1 className="hidden md:block text-4xl font-medium text-gray-700">{user.first_name} {user.last_name} {user.age ? <span className="font-light text-gray-500">, 27</span> : <></>}</h1>
                }

                {user.location ? <p className="font-light text-gray-600 mt-3">Bucharest, Romania</p> : <></>}
                {user.id === sessionUser.id ?
                    <div className="grid grid-cols-2 text-center order-last md:order-first mt-10 md:mt-0 mx-auto w-[250px]">
                        <div>
                            <p className="font-bold text-gray-700 text-xl">{user.followers_count}</p>
                            <p className="text-gray-400">Followers</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700 text-xl">{user.following_count}</p>
                            <p className="text-gray-400">Following</p>
                        </div>
                        {/* <div>
                        <p className="font-bold text-gray-700 text-xl">89</p>
                        <p className="text-gray-400">Comments</p>
                    </div> */}
                    </div> :
                    <></>}
            </div>}



            </div>
        </div>

    )
}
