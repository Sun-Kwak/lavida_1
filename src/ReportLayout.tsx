import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ComputedValues } from './UserInputForm';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';
import BloodPressureChart from './utils/BloodPressureChart';

interface Props {
  computed: ComputedValues;
}

const Wrapper = styled.div`
  position: relative;
`;

const Plain = styled.div`
  flex: 2;
  padding: 0 8px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 794px;
  height: auto;
  background: rgb(248, 245, 239);
  box-sizing: border-box;
  overflow-x: hidden;
  padding-left: 20px;
  padding-right: 20px;
  /* padding: 20px; */
`;

const PrintButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: transparent;
  border: none;
  color: #444;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  z-index: 10;

  svg {
    font-size: 24px;
  }

  @media print {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  color: #222;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 20px;
  font-size: 14px;
  line-height: 1.6;
  width: 100%;
  box-sizing: border-box;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  align-items: center;
  word-break: break-word;
  border-bottom: 1px solid rgb(109, 109, 109);
  height: 48px;
`;

const FooterRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr;
  align-items: center;
  height: 48px;
  border-top: 1px solid #000;
  border-bottom: 1px solid rgb(109, 109, 109);
  font-size: 14px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 1fr;
  align-items: center;
  height: 100%;
`;

const KcalText = styled.div`
  text-align: right;
  padding: 0 32px;
`;

const FooterInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  padding-right: 8px;
`;

const SectionTitleRow = styled.div`
  grid-column: span 2;
  height: 48px;
  background: rgb(237, 231, 220);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid rgb(109, 109, 109);
`;

const Label = styled.div`
  font-weight: 500;
  color: #333;
  background-color: rgb(237, 231, 220);
  padding: 0 8px;
  height: 100%;
  display: flex;
  align-items: center;
  &::before {
    content: '* ';
    color: #000;
  }
`;

const Value = styled.div`
  position: relative;
  background: #fff;
  padding: 0 8px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
`;

const GaugeFill = styled.div<{ percent: number; bg: string }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ percent }) => `${percent * 100}%`};
  background: ${({ bg }) => bg};
  z-index: 0;
`;

const GaugeText = styled.div`
  position: relative;
  z-index: 1;
  color: #000;
`;

const SubTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 32px 0 16px;
`;



const RadioGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PlainInput = styled.input`
  border: none;
  background: none;
  text-align: right;
  width: 40px;
  font-size: 14px;
`;

const ReportLayout: React.FC<Props> = ({ computed }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef, documentTitle: 'Report' });

  const [goal, setGoal] = useState('감소');
  const [targetWeight, setTargetWeight] = useState('10');

  const metabolicAgePct = Math.min(Number(computed.metabolicAge) / 100, 1);
  const agePct = Math.min(Number(computed.age) / 100, 1);
  const bmrPct = Math.min(Number(computed.bmr) / 2000, 1);
  const bmiPct = Math.min(Number(computed.bmi) / 40, 1);

  return (
    <Wrapper>
      <PrintButton onClick={handlePrint}><PrintIcon /></PrintButton>
      <div ref={componentRef}>
        <Container>
          <Header>
            <Title>{computed.name || '이름 없음'}님의 시진대사 보고서</Title>
            <Logo src="/lavida.png" alt="라비다 로고" />
          </Header>
          <Grid>
            <Section>
              <Row><Label>측정일시</Label><Value><GaugeText>{computed.measureDate || '-'}</GaugeText></Value></Row>
              <Row><Label>신장(cm)</Label><Value><GaugeText>{computed.height}</GaugeText></Value></Row>
              <Row><Label>체중(kg)</Label><Value><GaugeText>{computed.weight}</GaugeText></Value></Row>
              <Row><Label>골격근량(kg)</Label><Value><GaugeText>{computed.muscleMass}</GaugeText></Value></Row>
              <Row><Label>체지방량(kg)</Label><Value><GaugeText>{computed.bodyFatMass}</GaugeText></Value></Row>
              <Row><Label>최고/최저혈압(mmHg)</Label><Value><GaugeText>{computed.systolic}/{computed.diastolic}</GaugeText></Value></Row>

              <Row>
                <Label>대사연령</Label>
                <Value>
                  <GaugeFill bg="#a9cce3" percent={metabolicAgePct} />
                  <GaugeText>{computed.metabolicAge}</GaugeText>
                </Value>
              </Row>
              <Row>
                <Label>생물학적 연령</Label>
                <Value>
                  <GaugeFill bg="#f7c59f" percent={agePct} />
                  <GaugeText>{computed.age}</GaugeText>
                </Value>
              </Row>
              <Row>
                <Label>기초 대사율</Label>
                <Value>
                  <GaugeFill bg="#b4e197" percent={bmrPct} />
                  <GaugeText>{computed.bmr}</GaugeText>
                </Value>
              </Row>
              <Row>
                <Label>체질량 지수</Label>
                <Value>
                  <GaugeFill bg="#f9e79f" percent={bmiPct} />
                  <GaugeText>{computed.bmi}</GaugeText>
                </Value>
              </Row>

              <Row><Label>하루 필요 추정량</Label><Value><GaugeText>{computed.estimatedEnergy} kcal/일</GaugeText></Value></Row>
              <Row><Label>최소 필요 에너지</Label><Value><GaugeText>{computed.dailyRequiredEnergy} kcal/일 (권장)</GaugeText></Value></Row>
            </Section>

            <Section>
              <SectionTitleRow>체중조절(kg)</SectionTitleRow>
              <Row><Label>표준체중</Label><Value><GaugeText>{computed.idealWeight} kg</GaugeText></Value></Row>
              <Row><Label>체중조절</Label><Value><GaugeText>{computed.weightControl} kg</GaugeText></Value></Row>
              <Row><Label>지방조절</Label><Value><GaugeText>{computed.fatControl} kg</GaugeText></Value></Row>
              <Row><Label>표준 골격근량 대비</Label><Value><GaugeText>{computed.muscleControl} kg</GaugeText></Value></Row>
              <Row><Label>하루 섭취 단백질</Label><Value><GaugeText>{computed.dailyProtein} g</GaugeText></Value></Row>
              <Row><Label>혈압상태</Label><Value><GaugeText>{computed.bloodPressureStatus}</GaugeText></Value></Row>
              <SectionTitleRow>혈압측정치 (mmHg)</SectionTitleRow>
              <BloodPressureChart
  systolic={computed.systolicValue}
  diastolic={computed.diastolicValue}
/>

            </Section>
          </Grid>

          <SubTitle>WBM 주 3회 이상 참여</SubTitle>
          <FooterRow>
  <Label>주 3회 이상 참여 열량:</Label>
  <FooterContent>
    <KcalText>0 kcal</KcalText>
    <RadioGroup>
      <RadioLabel>
        <input type="radio" name="goal" value="유지" checked={goal === '유지'} onChange={() => setGoal('유지')} />
        체중 유지
      </RadioLabel>
      <RadioLabel>
        <input type="radio" name="goal" value="감소" checked={goal === '감소'} onChange={() => setGoal('감소')} />
        체중 감소
      </RadioLabel>
      <RadioLabel>
        <input type="radio" name="goal" value="증가" checked={goal === '증가'} onChange={() => setGoal('증가')} />
        체중 증가
      </RadioLabel>
    </RadioGroup>
    <FooterInput>
      <PlainInput type="text" value={targetWeight} onChange={(e) => setTargetWeight(e.target.value)} />
      kg
    </FooterInput>
  </FooterContent>
</FooterRow>


        </Container>
      </div>
    </Wrapper>
  );
};

export default ReportLayout;