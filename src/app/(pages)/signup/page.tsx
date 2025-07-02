"use client";

import { useEffect, useTransition } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TypeLogo from "@/components/ui/TypeLogo";
import { useAuth } from "@/hooks/auth/useAuth";

const SignUpSchema = Yup.object({
    loginId: Yup.string().required("아이디를 입력해주세요"),
    password: Yup.string().min(6, "6자 이상 입력해주세요").required("비밀번호를 입력해주세요"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다")
        .required("비밀번호 확인을 입력해주세요"),
    username: Yup.string().required("이름을 입력해주세요"),
    email: Yup.string().email("이메일 형식이 올바르지 않습니다").required("이메일을 입력해주세요"),
    position: Yup.string().required("파트를 선택해주세요"),
});

export default function SignUpPage() {
    const [isPending, startTransition] = useTransition();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            window.location.href = "/dashboard";
        }
    }, [isAuthenticated]);

    return (
        <div className="flex items-center justify-center w-full px-4 py-30">
            <div className="flex flex-col items-center justify-center w-full max-w-[600px] space-y-18">
                <TypeLogo className="w-full pointer-events-none" />

                <Formik
                    initialValues={{
                        loginId: "",
                        password: "",
                        confirmPassword: "",
                        username: "",
                        email: "",
                        position: "",
                    }}
                    validationSchema={SignUpSchema}
                    onSubmit={(values, { setSubmitting, setStatus }) => {
                        setStatus(null);
                        startTransition(() => {
                            const { confirmPassword, ...signupData } = values;
                            fetch("/api/signup", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(signupData),
                            })
                                .then(async (res) => {
                                    if (!res.ok) {
                                        const err = await res.json().catch(() => ({}));
                                        throw new Error(err?.message || "회원가입 실패");
                                    }
                                    return res.json();
                                })
                                .then((data) => {
                                    if (data?.success) {
                                        window.location.href = "/login";
                                    } else {
                                        throw new Error("응답이 올바르지 않습니다");
                                    }
                                })
                                .catch((err) => {
                                    setStatus(err.message);
                                })
                                .finally(() => setSubmitting(false));
                        });
                    }}
                >
                    {({ isSubmitting, status }) => (
                        <Form className="w-full space-y-4 sm:space-y-6">
                            {[
                                {
                                    name: "loginId",
                                    label: "아이디",
                                    type: "text",
                                    placeholder: "아이디를 입력해주세요",
                                },
                                {
                                    name: "password",
                                    label: "비밀번호",
                                    type: "password",
                                    placeholder: "비밀번호를 입력해주세요",
                                },
                                {
                                    name: "confirmPassword",
                                    label: "비밀번호 확인",
                                    type: "password",
                                    placeholder: "비밀번호를 다시 한 번 입력해주세요",
                                },
                                {
                                    name: "username",
                                    label: "이름",
                                    type: "text",
                                    placeholder: "이름을 입력해주세요",
                                },
                                {
                                    name: "email",
                                    label: "이메일",
                                    type: "email",
                                    placeholder: "이메일을 입력해주세요",
                                },
                            ].map(({ name, label, type, placeholder }) => (
                                <div
                                    key={name}
                                    className="flex flex-col sm:grid sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2"
                                >
                                    <label htmlFor={name} className="mt-2 body3_m sm:mt-0">
                                        {label}
                                    </label>
                                    <div className="w-full">
                                        <Field
                                            id={name}
                                            name={name}
                                            type={type}
                                            placeholder={placeholder}
                                            className="w-full px-7 py-3 body3_r text-white placeholder:text-gray-4 outline outline-gray-5 focus:outline-orange-main rounded-[10px] transition-colors duration-200"
                                        />
                                        <div className="h-5 mt-1">
                                            <ErrorMessage
                                                name={name}
                                                component="p"
                                                className="text-red-400 body5_r"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="flex flex-col sm:grid sm:grid-cols-[150px_1fr] items-start sm:items-center gap-1 sm:gap-2">
                                <label htmlFor="position" className="mt-2 body3_m sm:mt-0">
                                    파트
                                </label>
                                <div className="relative w-fit">
                                    <div className="relative w-fit">
                                        <Field
                                            as="select"
                                            name="position"
                                            className="px-5 py-2 pr-10 text-white transition-colors duration-200 rounded-full appearance-none cursor-pointer w-fit bg-gray-5 body4_r focus:ring-1 focus:outline-none focus:ring-orange-500"
                                        >
                                            <option value="">파트를 선택해주세요</option>
                                            <option value="PLAN">기획</option>
                                            <option value="DESIGN">디자인</option>
                                            <option value="FRONTEND">프론트엔드</option>
                                            <option value="BACKEND">백엔드</option>
                                            <option value="AI">AI</option>
                                        </Field>
                                        <div className="absolute text-white -translate-y-1/2 pointer-events-none top-1/2 right-4">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-4 h-4"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 12a.75.75 0 0 1-.53-.22l-4-4a.75.75 0 1 1 1.06-1.06L10 10.19l3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4A.75.75 0 0 1 10 12Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="h-5 mt-1">
                                        <ErrorMessage
                                            name="position"
                                            component="p"
                                            className="text-red-400 body5_r"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || isPending}
                                className="w-full py-3 bg-orange-main sub1_sb text-white rounded-[10px] hover:bg-orange-main/90 cursor-pointer transition-colors duration-200 disabled:opacity-50"
                            >
                                {isSubmitting || isPending ? "가입 중..." : "가입하기"}
                            </button>

                            {status && <p className="text-center text-red-400 body5_r">{status}</p>}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
