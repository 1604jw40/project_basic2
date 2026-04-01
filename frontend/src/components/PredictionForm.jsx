import Field from './Field';
import {
  yesNoOptions,
  seniorCitizenOptions,
  genderOptions,
  multipleLinesOptions,
  internetServiceOptions,
  onlineFeatureOptions,
  contractOptions,
  paymentMethodOptions,
} from '../utils/formOptions';

function SelectOptions({ options }) {
  return options.map((option) => {
    if (typeof option === 'string') {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    }

    return (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    );
  });
}

export default function PredictionForm({ values, errors, onChange, onSubmit, loading, onReset }) {
  const isInternetDisabled = values.internet_service === 'No';

  return (
    <form className="card form-card" onSubmit={onSubmit}>
      <div className="card-header-row">
        <div>
          <p className="section-kicker">예측 입력</p>
          <h2>신규 고객 예측 입력</h2>
          <p className="helper-text">
            필수값, 숫자 범위, 인터넷 부가서비스 연동 여부를 자동으로 검증합니다.
          </p>
        </div>
      </div>

      <section className="form-section">
        <h3>기본 정보</h3>
        <div className="form-grid three-col">
          <Field label="성별" required error={errors.gender}>
            <select name="gender" value={values.gender} onChange={onChange} required>
              <SelectOptions options={genderOptions} />
            </select>
          </Field>
          <Field label="고령자 여부" required error={errors.senior_citizen}>
            <select name="senior_citizen" value={values.senior_citizen} onChange={onChange} required>
              <SelectOptions options={seniorCitizenOptions} />
            </select>
          </Field>
          <Field label="배우자 여부" required error={errors.partner}>
            <select name="partner" value={values.partner} onChange={onChange} required>
              <SelectOptions options={yesNoOptions} />
            </select>
          </Field>
          <Field label="부양가족 여부" required error={errors.dependents}>
            <select name="dependents" value={values.dependents} onChange={onChange} required>
              <SelectOptions options={yesNoOptions} />
            </select>
          </Field>
          <Field label="가입 개월 수" required error={errors.tenure} hint="권장 범위: 0~120">
            <input type="number" name="tenure" min="0" max="120" value={values.tenure} onChange={onChange} required />
          </Field>
        </div>
      </section>

      <section className="form-section">
        <h3>서비스 정보</h3>
        <div className="form-grid three-col">
          <Field label="전화 서비스" required error={errors.phone_service}>
            <select name="phone_service" value={values.phone_service} onChange={onChange} required>
              <SelectOptions options={yesNoOptions} />
            </select>
          </Field>
          <Field label="다회선 이용" required error={errors.multiple_lines}>
            <select name="multiple_lines" value={values.multiple_lines} onChange={onChange} required>
              <SelectOptions options={multipleLinesOptions} />
            </select>
          </Field>
          <Field label="인터넷 서비스" required error={errors.internet_service} hint="No 선택 시 관련 부가서비스가 자동 비활성화됩니다.">
            <select name="internet_service" value={values.internet_service} onChange={onChange} required>
              <SelectOptions options={internetServiceOptions} />
            </select>
          </Field>
          <Field label="온라인 보안" required error={errors.online_security}>
            <select name="online_security" value={values.online_security} onChange={onChange} required disabled={isInternetDisabled}>
              <SelectOptions options={onlineFeatureOptions} />
            </select>
          </Field>
          <Field label="온라인 백업" required error={errors.online_backup}>
            <select name="online_backup" value={values.online_backup} onChange={onChange} required disabled={isInternetDisabled}>
              <SelectOptions options={onlineFeatureOptions} />
            </select>
          </Field>
          <Field label="기기 보호" required error={errors.device_protection}>
            <select name="device_protection" value={values.device_protection} onChange={onChange} required disabled={isInternetDisabled}>
              <SelectOptions options={onlineFeatureOptions} />
            </select>
          </Field>
          <Field label="기술 지원" required error={errors.tech_support}>
            <select name="tech_support" value={values.tech_support} onChange={onChange} required disabled={isInternetDisabled}>
              <SelectOptions options={onlineFeatureOptions} />
            </select>
          </Field>
          <Field label="스트리밍 TV" required error={errors.streaming_tv}>
            <select name="streaming_tv" value={values.streaming_tv} onChange={onChange} required disabled={isInternetDisabled}>
              <SelectOptions options={onlineFeatureOptions} />
            </select>
          </Field>
          <Field label="스트리밍 영화" required error={errors.streaming_movies}>
            <select name="streaming_movies" value={values.streaming_movies} onChange={onChange} required disabled={isInternetDisabled}>
              <SelectOptions options={onlineFeatureOptions} />
            </select>
          </Field>
        </div>
      </section>

      <section className="form-section">
        <h3>계약 · 결제 정보</h3>
        <div className="form-grid three-col">
          <Field label="계약 유형" required error={errors.contract_type} hint="드롭다운 단일 선택 방식이라 하나만 선택됩니다.">
            <select name="contract_type" value={values.contract_type} onChange={onChange} required>
              <SelectOptions options={contractOptions} />
            </select>
          </Field>
          <Field label="전자 청구서" required error={errors.paperless_billing}>
            <select name="paperless_billing" value={values.paperless_billing} onChange={onChange} required>
              <SelectOptions options={yesNoOptions} />
            </select>
          </Field>
          <Field label="결제 방법" required error={errors.payment_method}>
            <select name="payment_method" value={values.payment_method} onChange={onChange} required>
              <SelectOptions options={paymentMethodOptions} />
            </select>
          </Field>
          <Field label="월 요금" required error={errors.monthly_charges} hint="권장 범위: 0~200">
            <input
              type="number"
              name="monthly_charges"
              min="0"
              max="200"
              step="0.01"
              value={values.monthly_charges}
              onChange={onChange}
              required
            />
          </Field>
          <Field label="누적 요금" error={errors.total_charges} hint="비워두면 0으로 전송됩니다. 권장 범위: 0~20000">
            <input
              type="number"
              name="total_charges"
              min="0"
              max="20000"
              step="0.01"
              value={values.total_charges}
              onChange={onChange}
            />
          </Field>
        </div>
      </section>

      <div className="form-actions">
        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? '예측 중...' : '예측 실행'}
        </button>
        <button type="button" className="secondary-btn" onClick={onReset} disabled={loading}>
          초기화
        </button>
      </div>
    </form>
  );
}
