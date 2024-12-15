import React, { useContext } from "react";
import styles from "@/styles/checkoutFormGuest.module.css";
import loginStyles from "@/styles/login.module.css";

function CheckoutFormGuest({
  setToggleGuestLoginForm,
  register,
  errors,
  setUserFormData,
  userFormData,
}) {
  return (
    <div className={styles.guestLoginContainer}>
      <div>
        <h3>Already have an account?</h3>
        <button type="button" onClick={() => setToggleGuestLoginForm(false)}>
          Log in
        </button>
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
        <label className={loginStyles.label} htmlFor="email">
          Email:<span style={{ color: "red" }}> *</span>
        </label>
        <input
          {...register("email", { required: true })}
          type="email"
          className={loginStyles.loginInput}
          placeholder="YourEmail@example.com"
          id="email"
          onChange={(e) =>
            setUserFormData({ ...userFormData, email: e.target.value })
          }
        />
        {errors.email && (
          <p className={loginStyles.errorMessage}>{errors.email?.message}</p>
        )}
      </div>
      <div style={{ position: "relative", width: "65%" }}>
        <label className={loginStyles.label} htmlFor="firstName">
          First name:<span style={{ color: "red" }}> *</span>
        </label>
        <input
          {...register("firstName", { required: true })}
          type="text"
          className={loginStyles.loginInput}
          placeholder="First name"
          id="firstName"
          onChange={(e) =>
            setUserFormData({ ...userFormData, firstName: e.target.value })
          }
        />
        {errors.firstName && (
          <p className={loginStyles.errorMessage}>
            {errors.firstName?.message}
          </p>
        )}
      </div>
      <div style={{ position: "relative", width: "65%" }}>
        <label className={loginStyles.label} htmlFor="lastName">
          Last name:<span style={{ color: "red" }}> *</span>
        </label>
        <input
          {...register("lastName", { required: true })}
          type="text"
          className={loginStyles.loginInput}
          placeholder="Last name"
          id="lastName"
          onChange={(e) =>
            setUserFormData({ ...lastName, email: e.target.value })
          }
        />
        {errors.lastName && (
          <p className={loginStyles.errorMessage}>{errors.lastName?.message}</p>
        )}
      </div>
      <div style={{ position: "relative", width: "65%" }}>
        <label className={loginStyles.label} htmlFor="country">
          Country:<span style={{ color: "red" }}> *</span>
        </label>
        <input
          {...register("country", { required: true })}
          type="text"
          className={loginStyles.loginInput}
          placeholder="gremlings landia"
          id="country"
          onChange={(e) =>
            setUserFormData({ ...country, email: e.target.value })
          }
        />
        {errors.country && (
          <p className={loginStyles.errorMessage}> {errors.country?.message}</p>
        )}
      </div>
      <div style={{ position: "relative", width: "65%" }}>
        <label className={loginStyles.label} htmlFor="city">
          City:<span style={{ color: "red" }}> *</span>
        </label>
        <input
          {...register("city", { required: true })}
          type="text"
          className={loginStyles.loginInput}
          placeholder="gremlin outpost"
          id="city"
          onChange={(e) => setUserFormData({ ...city, email: e.target.value })}
        />
        {errors.city && (
          <p className={loginStyles.errorMessage}>{errors.city?.message}</p>
        )}
      </div>
      <div style={{ position: "relative", width: "65%" }}>
        <label className={loginStyles.label} htmlFor="streetAddress">
          Street address:<span style={{ color: "red" }}> *</span>
        </label>
        <input
          {...register("address", { required: true })}
          type="text"
          className={loginStyles.loginInput}
          placeholder="gremlinroad 22"
          id="streetAddress"
          onChange={(e) =>
            setUserFormData({ ...userFormData, address: e.target.value })
          }
        />
        {errors.address && (
          <p className={loginStyles.errorMessage}>{errors.address?.message}</p>
        )}
      </div>
      <div
        style={{
          position: "relative",
          width: "65%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label className={loginStyles.label} htmlFor="phoneNumber">
          Phone number:
        </label>
        <input
          id="phoneNumber"
          {...register("phoneNumber", { required: true })}
          type="tel"
          className={loginStyles.loginInput}
          placeholder="+358123456789"
          onChange={(e) =>
            setUserFormData({ ...userFormData, phoneNumber: e.target.value })
          }
        />
        <label
          style={{ fontSize: "10px", paddingLeft: "5px", marginTop: "-5px" }}
        >
          Used for notifying when package has arrived, otherwise email will be
          sent.
        </label>
      </div>
    </div>
  );
}

export default CheckoutFormGuest;
