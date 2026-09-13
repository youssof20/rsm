# Source-first curriculum plan

Page convention: physical PDF page, counted from 1. Both provided PDFs have matching printed page numbers on the teaching pages. RSM: 13 pages. Jaffe, V for Venous Pressure: 213 pages. Complete extracted page text is preserved in the adjacent JSON files for audit, not served as lessons. Figures and equations were visually checked on RSM 2/9 and thesis 106/107/162 before implementation.

Dependency path: anatomy → force/pressure/stress/strain → material response → ultrasound observations → resonance → analytical/numerical models → finite elements → inversion. Then RSM and thesis branches; reunite in comparison → COMSOL studies → lab prep → active recall.

Required teaching figures: pressurized vessel, nonlinear stress–strain, B/M-mode observation, driven oscillator and n=2 mode, discretized tissue, Chapter 5 boundary conditions, forward/inverse loop with transparent toy model, two-vessel coupling. Every interactive model is marked conceptual unless explicitly a dimensionless consequence of a cited equation. No browser FEM is claimed.

Useful equations: P=F/A and strain/stress definitions; thin-wall Laplace intuition; RSM scaling then full Eqs 1/21 and definitions; RSM stiffness recursion; thesis exponential modulus; squared residual + regularization; thesis area cost; conceptual oscillator. Advanced equations collapsed. All symbols carry units and roles.

Source cautions to preserve:
- RSM a is midwall radius, not lumen radius. E is iteratively estimated, not an independently measured constant. Thickness handling differs for mock-ups and humans (9–11).
- RSM mock-up −1.09 ± 1.98 mmHg is mean signed error ± SD, not human accuracy (3).
- RSM human studies: one author at four sites, then six carotid subjects; cuff comparison, not invasive waveform validation (4–5, 10–11). Filter cutoffs vary by processing stage/caption; no single universal cutoff is taught.
- Thesis Chapter 5: E0, alpha, r0, Pd, Ppulse fitted; surrounding-tissue parameters fixed (106–111). 6.2 mmHg diastolic MAE in opening/abstract versus 6.4 in 114; table rounds values. Report the discrepancy.
- Thesis p106 printed K1=4×10^-5 Pa/N is transcribed oddly relative to described stiffening; do not silently correct it or use it numerically in a simulation.
- Chapter 7: 27 enrolled, 26 supine pairs; regression agreement with JVP is not catheter validation (133–140). Mean waveform constrained by collapse-force regression (148–152).
- Chapter 8: 11 ICU patients, 2 EJV substitutions; previously trained MIT model versus in-sample ICU fits must stay separate. Figures label r² even where prose says correlation coefficient. Use figure notation (162–166).
- Chapter 9: 3 subjects; 2D coupled model vs earlier 3D vein-only model. No successful IJV waveforms from their three stage-3 acquisitions; waveform example uses MGH data with mean invasive CVP imposed, not synchronized (179–183).
- Chapters 6 and 7 contain wording inconsistencies and tentative causal inferences. Teach compression-dependent stiffness observation without treating it as proof of a unique constitutive law or Poisson ratio.

COMSOL bridge is a hypothetical teaching workflow, not the professor’s assignment. Supplemental official COMSOL documentation is clearly separated from the two primary PDFs. No clinical procedure is taught.
