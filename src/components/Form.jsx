// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./Form.css";
// import Input from "./form/input";
// import CustomSelect from "./form/select";
// import { cityOptions, VillageOptions } from "../utils/options";
// import cricketLogo from "../assets/cricket-logo.png";
// import Radio from "./form/radio"; 

// function Form() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const paymentId = location.state?.paymentId || "N/A";
//   const upiTransactionId = location.state?.upiTransactionId || paymentId;
//   const categories = location.state?.categories || "N/A";
//   const vpa = location.state?.vpa || null;

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     photo: null, // Store the file object here
//     categories: "Batting", // Added payment method state
//     size: "XS"
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(""); // For error message

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     const allowedTypes = ["image/jpeg", "image/jpg", "image/hvc"];
//     if (file && !allowedTypes.includes(file.type)) {
//       setErrorMessage("Only JPG, JPEG, or HVC files are allowed.");
//       setFormData((prev) => ({ ...prev, photo: null })); 
//       return;
//     }

//     if (file && file.size > 5 * 1024 * 1024) {
//       setErrorMessage("File size must be less than 5 MB.");
//       setFormData((prev) => ({ ...prev, photo: null })); 
//       return;
//     }

//     setErrorMessage(""); 
//     setFormData((prev) => ({ ...prev, photo: file }));
//   };

//   const handleFileRemove = () => {
//     setFormData((prev) => ({ ...prev, photo: null })); 
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     try {
//       // Send data to Google Sheets
//       await sendToGoogleSheets();

//       console.log("Form submitted:", formData);
//       console.log("Payment ID:", paymentId);

//       setSubmitted(true);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to submit form. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const sendToGoogleSheets = async () => {
//     const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

//     if (!GOOGLE_SHEETS_URL) {
//       console.error("Google Sheets URL not configured");
//       alert(
//         "Google Sheets integration is not configured. Please contact the administrator."
//       );
//       throw new Error("Google Sheets URL not configured");
//     }

//     const dataToSend = {
//       paymentId: paymentId,
//       upiTransactionId: upiTransactionId,
//       categories: formData.categories, // Send the payment method data
//       size:formData.size,
//       vpa: vpa,
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       address: formData.address,
//       submittedAt: new Date().toLocaleString(),
//       photo: formData.photo ? formData.photo.name : null, // Send the file name or null
//     };

//     try {
//       const response = await fetch(GOOGLE_SHEETS_URL, {
//         method: "POST",
//         mode: "no-cors", // Google Apps Script requires no-cors mode
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(dataToSend),
//       });

//       console.log("Data sent to Google Sheets successfully");
//     } catch (error) {
//       console.error("Error sending to Google Sheets:", error);
//       throw error;
//     }
//   };

//   if (submitted) {
//     return (
//       <div className="form-container">
//         <div className="form-content">
//           <div className="success-message">
//             <img
//               src={cricketLogo}
//               alt="Cricket Logo"
//               className="cricket-logo"
//             />
//             <h2>✓ Form Submitted Successfully!</h2>
//             <p>Thank you for your submission. We'll get back to you soon.</p>
//             <button onClick={() => navigate("/")} className="home-button">
//               Go to Home
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="form-container">
//       <div className="form-content">
//         <img src={cricketLogo} alt="Cricket Logo" className="cricket-logo" />
//         <h1>Complete Your Registration</h1>
//         <div className="payment-info">
//           <strong>UPI Transaction ID:</strong> {upiTransactionId}
//           {vpa && (
//             <div style={{ fontSize: "0.85em", marginTop: "0.25rem" }}>
//               <strong>UPI ID:</strong> {vpa}
//             </div>
//           )}
//         </div>
//         <form onSubmit={handleSubmit} className="registration-form">
//           <div className="form-style">
//             <Input label="First Name" />
//             <Input label="Father Name" />
//             <Input label="Date Of Birth" type="date" />
//             <Input label="Mobile No." type="number" />
//             <CustomSelect
//               label="City"
//               options={cityOptions}
//               placeholder="Select City"
//             />
//             <CustomSelect
//               label="Village"
//               options={VillageOptions}
//               placeholder="Select Village"
//             />

//             {/* Add photo upload input here */}
//             <div className="file-upload">
//               <label htmlFor="photo">Upload Your Photo</label>
//               <input
//                 type="file"
//                 id="photo"
//                 name="photo"
//                 accept="image/jpeg, image/jpg, image/hvc"
//                 onChange={handleFileChange}
//               />
//               {/* Display file name when a file is selected */}
//               {formData.photo ? (
//                 <div className="file-info">
//                   <span>{formData.photo.name}</span>
//                   <button
//                     type="button"
//                     className="remove-file"
//                     onClick={handleFileRemove}
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ) : null}

//               {errorMessage && <p className="error-messages">{errorMessage}</p>}
//             </div>

//             {/* Add Radio Button for  Categories*/}
//             <div className="categories-method">
//               <label style={{ color: 'black', fontWeight:"600" }}>Select Categories</label>
//               <div className="radio-tick">

//               <Radio
//                 name="Batting"
//                 value="batting"
//                 label="Batting"
//                 checked={formData.categories === "batting"}
//                 onChange={handleChange}
//               />
//               <Radio
//                 name="Bowling"
//                 value="bowling"
//                 label="Bowling"
//                 checked={formData.categories === "bowling"}
//                 onChange={handleChange}
//               />
//               <Radio
//                 name="All-Rounder"
//                 value="all-rounder"
//                 label="All-Rounder"
//                 checked={formData.categories === "all-Rounder"}
//                 onChange={handleChange}
//               />
//               <Radio
//                 name="Wicket-Keeper"
//                 value="wicket-Keeper"
//                 label="Wicket-Keeper"
//                 checked={formData.categories === "wicket-Keeper"}
//                 onChange={handleChange}
//               />
//               </div>
//               {/* Add Radio Button for  T-shirt*/}
//             <div>
//               <label style={{ color: 'black', fontWeight:"600" }}>Select T-shirt Size</label>
//               <div className="radio-tick">

//               <Radio
//                 name="XS"
//                 value="xs"
//                 label="XS"
//                 checked={formData.categories === "xs"}
//                 onChange={handleChange}
//               />
//               <Radio
//                 name="S"
//                 value="s"
//                 label="S"
//                 checked={formData.categories === "s"}
//                 onChange={handleChange}
//               />
//               <Radio
//                 name="M"
//                 value="m"
//                 label="M"
//                 checked={formData.categories === "m"}
//                 onChange={handleChange}
//               />
//               <Radio
//                 name="L"
//                 value="l"
//                 label="L"
//                 checked={formData.categories === "l"}
//                 onChange={handleChange}
//               />
//               <Radio
//                 name="XL"
//                 value="xl"
//                 label="XL"
//                 checked={formData.categories === "xl"}
//                 onChange={handleChange}
//               />
//               <Radio
//                 name="XXL"
//                 value="xxl"
//                 label="XXL"
//                 checked={formData.categories === "xxl"}
//                 onChange={handleChange}
//               />
//               <Radio
//                 name="XXXL"
//                 value="xxxl"
//                 label="XXXL"
//                 checked={formData.categories === "xxxl"}
//                 onChange={handleChange}
//               />
//               </div>

// </div>
          

//             </div>
//           </div>

//           <button type="submit" className="submit-button" disabled={submitting}>
//             {submitting ? "Submitting..." : "Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Form;


import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import "./Form.css";
import Input from "./form/input";
import CustomSelect from "./form/select";
import { cityOptions, VillageOptions } from "../utils/options";
import cricketLogo from "../assets/cricket-logo.png";
import Radio from "./form/radio";
import { useState } from "react";

function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentId = location.state?.paymentId || "N/A";
  const upiTransactionId = location.state?.upiTransactionId || paymentId;
  const vpa = location.state?.vpa || null;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {

    console.log('data', data)
    setSubmitting(true);

    try {
      await sendToGoogleSheets(data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const sendToGoogleSheets = async (formData) => {
    const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

    if (!GOOGLE_SHEETS_URL) {
      console.error("Google Sheets URL not configured");
      alert("Google Sheets integration is not configured. Please contact the administrator.");
      throw new Error("Google Sheets URL not configured");
    }

    const dataToSend = {
      paymentId: paymentId,
      upiTransactionId: upiTransactionId,
      categories: formData.categories,
      size: formData.size,
      vpa: vpa,
      name: formData.name,
      fatherName: formData.fatherName,
      dob: formData.dob,
      phone: formData.phone,
      city: formData.city,
      village: formData.village,
      categories: formData.categories,
      size: formData.size,
      submittedAt: new Date().toLocaleString(),
      photo: formData.photo ? formData.photo[0]?.name : null,
    };

    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      console.log("Data sent to Google Sheets successfully");
    } catch (error) {
      console.error("Error sending to Google Sheets:", error);
      throw error;
    }
  };

  if (submitted) {
    return (
      <div className="form-container">
        <div className="form-content">
          <div className="success-message">
            <img src={cricketLogo} alt="Cricket Logo" className="cricket-logo" />
            <h2>✓ Form Submitted Successfully!</h2>
            <p>Thank you for your submission. We'll get back to you soon.</p>
            <button onClick={() => navigate("/")} className="home-button">
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-content">
        <img src={cricketLogo} alt="Cricket Logo" className="cricket-logo" />
        <h1>Complete Your Registration</h1>
        <div className="payment-info">
          <strong>UPI Transaction ID:</strong> {upiTransactionId}
          {vpa && (
            <div style={{ fontSize: "0.85em", marginTop: "0.25rem" }}>
              <strong>UPI ID:</strong> {vpa}
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
          <div className="form-style">
            {/* First Name Field */}
           {/* First Name Field */}
<Input
  label="First Name"
  {...register("name", {
    required: "First Name is required",
    maxLength: {
      value: 100,
      message: "First Name must be less than or equal to 100 characters",
    },
  })}
  maxLength={100} // Set maxLength for limiting characters
  onInput={(e) => {
    // Prevent typing more than 100 characters
    if (e.target.value.length > 100) {
      e.target.value = e.target.value.slice(0, 100); // Trim input to 100 characters
    }
  }}
/>
{errors.name && <p className="error-messages">{errors.name.message}</p>}

{/* Father Name Field */}
<Input
  label="Father Name"
  {...register("fatherName", {
    required: "Father Name is required",
    maxLength: {
      value: 100,
      message: "Father Name must be less than or equal to 100 characters",
    },
  })}
  maxLength={100} // Set maxLength for limiting characters
  onInput={(e) => {
    // Prevent typing more than 100 characters
    if (e.target.value.length > 100) {
      e.target.value = e.target.value.slice(0, 100); // Trim input to 100 characters
    }
  }}
/>
{errors.fatherName && <p className="error-messages">{errors.fatherName.message}</p>}

            {/* Date Of Birth Field */}
            <Input
              label="Date Of Birth"
              type="date"
              {...register("dob", { required: "Date of Birth is required" })}
            />
            {errors.dob && <p className="error-messages">{errors.dob.message}</p>}

            {/* Mobile Number Field */}
            <Input
  label="Mobile No."
  type="number"
  {...register("phone", {
    required: "Mobile number is required",
    minLength: { value: 10, message: "Mobile number must be 10 digits" },
    maxLength: { value: 10, message: "Mobile number must be 10 digits" },
    pattern: {
      value: /^[0-9]{10}$/, // Regex to ensure it's exactly 10 digits
      message: "Mobile number must be exactly 10 digits",
    }
  })}
  inputMode="numeric"
  maxLength={10}
  onInput={(e) => {
    // Ensure only 10 digits are allowed
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.slice(0, 10);
    }
  }}
/>
{errors.phone && <p className="error-messages">{errors.phone.message}</p>}


            {/* City Select Field */}
            <CustomSelect
              label="City"
              options={cityOptions}
              placeholder="Select City"
              {...register("city", { required: "City is required" })}
                        onChange={(e) => setValue("city", e?.value)}

            />
            {errors.city && <p className="error-messages">{errors.city.message}</p>}

            {/* Village Select Field */}
            <CustomSelect
              label="Village"
              options={VillageOptions}
              placeholder="Select Village"
              {...register("village", { required: "Village is required" })}
                        onChange={(e) => setValue("village", e?.value)}

            />
            {errors.village && <p className="error-messages">{errors.village.message}</p>}

            {/* Photo Upload Field */}
            <div className="file-upload">
              <label htmlFor="photo">Upload Your Photo</label>
              <input
                type="file"
                id="photo"
                {...register("photo", {
                  required: "Photo is required",
                  validate: {
                    maxSize: (value) => {
                      if (value[0]?.size > 5 * 1024 * 1024) {
                        return "File size must be less than 5 MB.";
                      }
                      return true;
                    },
                    fileType: (value) => {
                      const allowedTypes = ["image/jpeg", "image/jpg", "image/hvc"];
                      if (!allowedTypes.includes(value[0]?.type)) {
                        return "Only JPG, JPEG, or HVC files are allowed.";
                      }
                      return true;
                    },
                  },
                })}
              />
              {errors.photo && <p className="error-messages">{errors.photo.message}</p>}
            </div>

            {/* Categories Selection */}
            <div className="categories-method">
              <label style={{ color: 'black', fontWeight: "600" }}>Select Categories</label>
              <div className="radio-tick">
                <Radio
                  name="categories"
                  value="batting"
                  label="Batting"
                  {...register("categories")}
                  checked={watch("categories") === "batting"}
                />
                <Radio
                  name="categories"
                  value="bowling"
                  label="Bowling"
                  {...register("categories")}
                  checked={watch("categories") === "bowling"}
                />
                <Radio
                  name="categories"
                  value="all-rounder"
                  label="All-Rounder"
                  {...register("categories")}
                  checked={watch("categories") === "all-rounder"}
                />
                <Radio
                  name="categories"
                  value="wicket-keeper"
                  label="Wicket-Keeper"
                  {...register("categories")}
                  checked={watch("categories") === "wicket-keeper"}
                />
              </div>
            </div>

            {/* T-shirt Size Selection */}
            <div>
              <label style={{ color: 'black', fontWeight: "600" }}>Select T-shirt Size</label>
              <div className="radio-tick">
                <Radio
                  name="size"
                  value="xs"
                  label="XS"
                  {...register("size")}
                  checked={watch("size") === "xs"}
                />
                <Radio
                  name="size"
                  value="s"
                  label="S"
                  {...register("size")}
                  checked={watch("size") === "s"}
                />
                <Radio
                  name="size"
                  value="m"
                  label="M"
                  {...register("size")}
                  checked={watch("size") === "m"}
                />
                <Radio
                  name="size"
                  value="l"
                  label="L"
                  {...register("size")}
                  checked={watch("size") === "l"}
                />
                <Radio
                  name="size"
                  value="xl"
                  label="XL"
                  {...register("size")}
                  checked={watch("size") === "xl"}
                />
                <Radio
                  name="size"
                  value="xxl"
                  label="XXL"
                  {...register("size")}
                  checked={watch("size") === "xxl"}
                />
                <Radio
                  name="size"
                  value="xxxl"
                  label="XXXL"
                  {...register("size")}
                  checked={watch("size") === "xxxl"}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
