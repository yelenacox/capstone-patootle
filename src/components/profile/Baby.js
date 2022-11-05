export const Baby = ({ userBaby }) => {

    return <>
    <section key={`userBaby--${userBaby.id}`} className="baby">
        {userBaby?.baby?.picture !== "" ?
            <img className="baby_image" src={userBaby?.baby?.picture} />
            : <img className="baby_image" src="https://i.ibb.co/VQs2j8B/baby-icon.jpg" />}
        <div>{userBaby?.baby?.name}</div>
        <div>{userBaby?.baby?.birthday}</div>
        <button
        // onClick={() => <BabyForm />}
        // className="button_edit"
        >Edit Baby Profile</button>
    </section>
    </>

}