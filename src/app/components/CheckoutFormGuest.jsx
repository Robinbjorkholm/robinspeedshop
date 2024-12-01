import React, { useContext } from "react";
import styles from "@/styles/checkoutGuest.module.css";
import loginStyles from "@/styles/login.module.css";


function CheckoutFormGuest({ setToggleGuestLoginForm,register,errors }) {

  
  return (
    <div className={styles.guestLoginContainer}>
      <div>
        <h3>Already have an account?</h3>
        <button type="button" onClick={() => setToggleGuestLoginForm(false)}>Log in</button>
        <p style={{ color: "#585858" }}>or continue as a guest</p>
      </div>
      <h3>Your information</h3>
      <p style={{ color: "red" }}>
        *{" "}
        <span style={{ color: "red", fontSize: "12px" }}>
          is a required field
        </span>
      </p>
      <div style={{ position: "relative", width: "65%" }}>
        <label className={loginStyles.label}>
          Email:<span style={{ color: "red" }}> *</span>
        </label>
        <input
          {...register("email", { required: true })}
          type="email"
          className={loginStyles.loginInput}
          placeholder="YourEmail@example.com"
         
        />
        {errors.email && (
          <p style={{ color: "red", marginTop: -15 }}>
            {errors.email?.message}
          </p>
        )}
      </div>
      <div style={{ position: "relative", width: "65%" }}>
        <label className={loginStyles.label}>
          First name:<span style={{ color: "red" }}> *</span>
        </label>
        <input
          {...register("firstName", { required: true })}
          type="text"
          className={loginStyles.loginInput}
          placeholder="First name"
         
        />
        {errors.firstName && (
          <p style={{ color: "red", marginTop: -15 }}>
            {errors.firstName?.message}
          </p>
        )}
      </div>
      <div style={{ position: "relative", width: "65%" }}>
        <label className={loginStyles.label}>
          Last name:<span style={{ color: "red" }}> *</span>
        </label>
        <input
          {...register("lastName", { required: true })}
          type="text"
          className={loginStyles.loginInput}
          placeholder="Last name"
         
        />
        {errors.lastName && (
          <p style={{ color: "red", marginTop: -15 }}>
            {errors.lastName?.message}
          </p>
        )}
      </div>
      <div style={{ position: "relative", width: "65%" }}>
        <label className={loginStyles.label}>
          Country:<span style={{ color: "red" }}> *</span>
        </label>
        <input
          {...register("country", { required: true })}
          type="text"
          className={loginStyles.loginInput}
          placeholder="gremlings landia"
         
        />
        {errors.country && (
          <p style={{ color: "red", marginTop: -15 }}>
            {" "}
            {errors.country?.message}
          </p>
        )}
      </div>
      <div style={{ position: "relative", width: "65%" }}>
        <label className={loginStyles.label}>
          City:<span style={{ color: "red" }}> *</span>
        </label>
        <input
          {...register("city", { required: true })}
          type="text"
          className={loginStyles.loginInput}
          placeholder="gremlin outpost"
         
        />
        {errors.city && (
          <p style={{ color: "red", marginTop: -15 }}>{errors.city?.message}</p>
        )}
      </div>
      <div style={{ position: "relative", width: "65%" }}>
        <label className={loginStyles.label}>Street address:</label>
        <input
          {...register("address", { required: true })}
          type="text"
          className={loginStyles.loginInput}
          placeholder="gremlinroad 22"
         
        />
      </div>
      <div
        style={{
          position: "relative",
          width: "65%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label className={loginStyles.label}>Phone number:</label>
        <label style={{ fontSize: "10px", paddingLeft: "5px" }}>
          Used for notifying when package has arrived, otherwise email will be
          sent.
        </label>
        <input
          {...register("phoneNumber", { required: true })}
          type="tel"
          className={loginStyles.loginInput}
          placeholder="+358123456789"
         
        />
      </div>
    </div>
  );
}

export default CheckoutFormGuest;
