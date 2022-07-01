import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    SaveButton,
    Step,
    StepButton,
    Stepper,
    TextField,
    useMediaQuery,
    useTheme
} from "@pankod/refine-mui";
import {
    Controller,
    UseModalFormReturnType,
    useStepsForm
} from "@pankod/refine-react-hook-form";

const stepTitles = [
    "Step 1 Title",
    "Step 2 Title",
];

export const EditPostModalAndStepper: React.FC<UseModalFormReturnType> = ({
    saveButtonProps,
    refineCore: { queryResult, onFinish },
    modal: { visible, close, title },
    register,
    handleSubmit,
    control,
    formState: { errors }
}) => {
    const {
        steps: { currentStep, gotoStep },
        watch,
    } = useStepsForm();


    const theme = useTheme();
    const isSmallOrLess = useMediaQuery(theme.breakpoints.down("sm"));

    const renderFormByStep = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <TextField
                            {...register("title", {
                                required: "This field is required"
                            })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                            margin="normal"
                            fullWidth
                            label="Title"
                            name="title"
                            autoFocus
                        />
                        {/* Textfield "content" will work if you ucomment this */}
                        {/* <TextField
                            {...register("content", {
                                required: "This field is required"
                            })}
                            error={!!errors.content}
                            helperText={errors.content?.message}
                            margin="normal"
                            label="Content"
                            multiline
                            rows={4}
                        /> */}
                    </>
                )
            case 1:
                return (
                    <>
                        <TextField
                            {...register("content", {
                                required: "This field is required"
                            })}
                            error={!!errors.content}
                            helperText={errors.content?.message}
                            margin="normal"
                            label="Content"
                            multiline
                            rows={4}
                        />
                    </>

                )
        }
    }

    return (
        <Dialog
            open={visible}
            onClose={close}
            PaperProps={{ sx: { minWidth: 500 } }}
            // keepMounted
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <Box
                    component="form"
                    sx={{ display: "flex", flexDirection: "column" }}
                    autoComplete="off"
                >
                    <Stepper

                        activeStep={currentStep}
                        orientation={isSmallOrLess ? "vertical" : "horizontal"}
                    >
                        {stepTitles.map((label, index) => (
                            <Step key={label}>
                                <StepButton onClick={() => gotoStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <br />
                    {renderFormByStep(currentStep)}
                </Box>
            </DialogContent>
            <DialogActions>
                <>
                    {currentStep > 0 && (
                        <Button
                            onClick={() => {
                                gotoStep(currentStep - 1);
                            }}
                        >
                            Previous
                        </Button>
                    )}
                    {currentStep < stepTitles.length - 1 && (
                        <Button
                            onClick={() => {
                                gotoStep(currentStep + 1);
                            }}
                        >
                            Next
                        </Button>
                    )}
                    {currentStep === stepTitles.length - 1 && (
                        <SaveButton onClick={
                            handleSubmit(async (values) => {
                                await onFinish(values)
                                close()
                            })
                        }

                        />
                    )}
                </>
            </DialogActions>
        </Dialog>
    );
};
