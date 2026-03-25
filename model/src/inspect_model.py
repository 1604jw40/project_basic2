import joblib

bundle = joblib.load("model/artifacts/model_v1.joblib")

print("bundle keys:", bundle.keys())

print("\nfeature_names:")
for i, name in enumerate(bundle["feature_names"], start=1):
    print(f"{i:02d}. {name}")

print("\nthreshold:", bundle["threshold"])
print("scaler type:", type(bundle["scaler"]))
print("model type:", type(bundle["model"]))

scaler = bundle["scaler"]

print("\n=== scaler.feature_names_in_ ===")
if hasattr(scaler, "feature_names_in_"):
    for i, name in enumerate(scaler.feature_names_in_, start=1):
        print(f"{i:02d}. {name}")
else:
    print("scaler.feature_names_in_ 없음")