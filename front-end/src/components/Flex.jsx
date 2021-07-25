import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  max-width: ${(props) => props.maxWidth || "auto"};
  max-height: ${(props) => props.maxHeight || "auto"};
  min-width: ${(props) => props.minWidth || "auto"};
  min-height: ${(props) => props.minHeight || "auto"};
  flex-direction: ${(props) => props.flexDirection || "row"};
  flex: ${(props) => props.flex || "0 1 auto"};
  justify-content: ${(props) => props.justifyContent || "start"};
  align-items: ${(props) => props.alignItems || "auto"};
  align-self: ${(props) => props.alignSelf || "auto"};
  justify-self: ${(props) => props.justifySelf || "auto"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  padding: ${(props) => props.padding || "0"};
  margin: ${(props) => props.margin || "0"};
  margin-top: ${(props) => props.mt || "0"};
  margin-bottom: ${(props) => props.mb || "0"};
  margin-left: ${(props) => props.ml || "0"};
  margin-right: ${(props) => props.mr || "0"};
`;

export default Flex;
